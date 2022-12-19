import { joiResolver } from '@hookform/resolvers/joi';
import Buttons from 'Components/Shared/Button';
import Input from 'Components/Shared/Inputs';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getByIdProjects, updateProject } from 'redux/projects/thunks';
import { confirmModalClose, confirmModalOpen, messageModalClose } from 'redux/super-admins/actions';
import { projectsSchema } from './validations';
import styles from './projects.module.css';
import Sidebar from '../Sidebar';

const ProjectsForm = (props) => {
  const token = sessionStorage.getItem('token');
  const params = useParams();
  const id = params.id && params.id;
  const dispatch = useDispatch();
  const [projectInput, setProjectInput] = useState({});
  const [employeesProject, setEmployeesProject] = useState([]);
  const {
    modalContent,
    showModalMessage,
    showConfirmModal,
    isLoading,
    item: project
  } = useSelector((state) => state.projects);

  useEffect(async () => {
    dispatch(getByIdProjects(id, token));
  }, []);

  useEffect(() => {
    if (project && id) {
      setProjectInput({
        name: project.name,
        description: project.description,
        startDate: fixDate(project.startDate),
        endDate: fixDate(project.endDate),
        clientName: project.clientName
      });
      setEmployeesProject(project.employees);
      setFormValues();
    }
  }, [project]);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const setFormValues = () => {
    const { name, description, startDate, endDate, clientName, employees } = project;
    const formData = {
      name,
      description,
      startDate: fixDate(startDate),
      endDate: fixDate(endDate),
      clientName,
      employees
    };
    setEmployeesProject(employees);
    reset(formData);
  };

  const onConfirm = () => {
    dispatch(updateProject(id, projectInput, employeesProject));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const redirect = () => {
    props.history.push('/projects');
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: joiResolver(projectsSchema) });

  const onSubmit = (data) => {
    setProjectInput({
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      clientName: data.clientName
    });
    setEmployeesProject(data.employees);
    const content = `Are you sure you want to edit the Project: ${data.name}?`;
    dispatch(confirmModalOpen(content));
  };

  const resetForm = () => {
    id ? setFormValues() : reset();
  };

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div>
        <Sidebar />
        {!isLoading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Edit Project</div>
              <Input
                label={'Project Name'}
                name="name"
                type="text"
                placeholder={'Project Name'}
                register={register}
                error={errors.name?.message}
              />
              <Input
                label={'Description'}
                name="description"
                type="text"
                placeholder={'Description'}
                register={register}
                error={errors.description?.message}
              />
              <Input
                label={'Start Date'}
                name="startDate"
                type="date"
                register={register}
                error={errors.startDate?.message}
              />
              <Input
                label={'End Date'}
                name="endDate"
                type="date"
                register={register}
                error={errors.endDate?.message}
              />
              <Input
                label={'Client Name'}
                name="clientName"
                type="text"
                placeholder={'Client Name'}
                register={register}
                error={errors.clientName?.message}
              />
            </div>
            <div className={styles.card}>
              <Buttons type="submit" variant="primary" name="Confirm" />
              <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
              <Buttons
                variant="secondary"
                name="Cancel"
                onClick={() => props.history.push('/projects')}
              />
            </div>
          </form>
        ) : (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsForm;
