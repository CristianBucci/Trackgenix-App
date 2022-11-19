import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createProject, updateProject, getByIdProjects } from 'redux/projects/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/projects/actions';
import { getEmployees } from 'redux/employees/thunks';
import { projectsSchema } from './validations';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Select from 'Components/Shared/Select/index';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

const AddProject = (props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: joiResolver(projectsSchema) });

  const {
    modalContent,
    showModalMessage,
    showConfirmModal,
    isLoading,
    item: project
  } = useSelector((state) => state.projects);

  const { list: employees } = useSelector((state) => state.employees);
  const params = useParams();
  const id = params.id && params.id;
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  const [formText, setFormText] = useState('Add Project');
  const [employeesProject, setEmployeesProject] = useState([]);
  const [projectInput, setProjectInput] = useState({});

  const onSubmit = (data) => {
    setProjectInput({
      name: data.name,
      description: data.description,
      startDate: fixDate(data.startDate),
      endDate: fixDate(data.endDate),
      clientName: data.clientName
    });
    setEmployeesProject([
      {
        employeeId: data.employeeId,
        rate: data.employeeRate,
        role: data.employeeRole
      }
    ]);
    const content = `Are you sure you want to ${
      id ? 'edit the Project with id ' + id : 'create a new Project'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const redirect = () => {
    props.history.push('/projects');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    id
      ? dispatch(updateProject(id, projectInput, employeesProject))
      : dispatch(createProject(projectInput, employeesProject));
  };

  useEffect(async () => {
    if (id) {
      setFormText('Update Project');
      dispatch(getByIdProjects(id));
    }
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
      setEmployeesProject([
        {
          employeeId: project.employees[0].employeeId,
          rate: project.employees[0].rate,
          role: project.employees[0].role
        }
      ]);
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('startDate', fixDate(project.startDate));
      setValue('endDate', fixDate(project.endDate));
      setValue('clientName', project.clientName);
      setValue('employeeId', project.employees[0].employeeId);
      setValue('employeeRate', project.employees[0].rate);
      setValue('employeeRole', project.employees[0].role);
    }
  }, [project]);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
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
        {!isLoading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>{formText}</div>
              <Input
                label={'Project Name'}
                name="name"
                required
                type="text"
                placeholder={'Project Name'}
                register={register}
                error={errors.name?.message}
              />
              <Input
                label={'Description'}
                name="description"
                required
                type="text"
                placeholder={'Description'}
                register={register}
                error={errors.description?.message}
              />
              <Input
                label={'Start Date'}
                required
                name="startDate"
                type="date"
                register={register}
                error={errors.startDate?.message}
              />
              <Input
                label={'End Date'}
                required
                name="endDate"
                type="date"
                register={register}
                error={errors.endDate?.message}
              />
              <Input
                label={'Client Name'}
                name="clientName"
                required
                type="text"
                placeholder={'Client Name'}
                register={register}
                error={errors.clientName?.message}
              />
              <div className={styles.card}>
                {employeesProject?.map((option, index) => {
                  return (
                    <div key={option}>
                      <label>Employee</label>
                      <Select
                        options={employees}
                        keyMap={'_id'}
                        title={'Employee'}
                        fieldToShow={'name'}
                        second={'lastName'}
                        isDisabled={false}
                        name="employeeId"
                        register={register}
                        error={errors.employeeId?.message}
                      ></Select>
                      <Input
                        label={'Rate'}
                        name="employeeRate"
                        required
                        type="number"
                        placeholder={'Rate'}
                        register={register}
                        error={errors.employeeRate?.message}
                      />
                      <label>Role</label>
                      <Select
                        options={roles}
                        keyMap={'role'}
                        title={'Role'}
                        fieldToShow={'role'}
                        isDisabled={false}
                        name="employeeRole"
                        register={register}
                        error={errors.employeeRole?.message}
                      ></Select>
                      <button
                        type="button"
                        onClick={() => {
                          setEmployeesProject([
                            ...employeesProject.slice(0, index),
                            ...employeesProject.slice(
                              index + 1 ? index + 1 : index,
                              employeesProject.length
                            )
                          ]);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
                <div className={styles.addEmployeeButton}>
                  <button
                    onClick={() =>
                      setEmployeesProject([
                        ...employeesProject,
                        {
                          employeeId: '',
                          rate: 0,
                          role: ''
                        }
                      ])
                    }
                    type="button"
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Buttons type="submit" variant="primary" name="Confirm" />
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

export default AddProject;
