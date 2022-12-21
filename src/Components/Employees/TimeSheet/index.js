import { useEffect, useState } from 'react';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm/index';
import ModalMessage from 'Components/Shared/Modal/ModalMessage/index';
import Input from 'Components/Shared/Inputs';
import Select from 'Components/Shared/Select/index';
import Buttons from 'Components/Shared/Button/index';
import styles from './timeSheet.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/timesheets/actions';
import { addTimeSheet } from 'redux/timesheets/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';
import { logout } from 'redux/auth/thunks';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { timesheetsValidationSchema } from 'Components/Employees/TimeSheet/validations';
import { useParams } from 'react-router-dom';

const EmployeeTimeSheet = (props) => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const dispatch = useDispatch();

  const { modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.timesheets
  );

  const params = useParams();
  const projectID = params.id && params.id;

  const [timeSheetInput, setTimeSheetInput] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: id,
    project: ''
  });

  const { list: tasks } = useSelector((state) => state.tasks);
  const { list: projects } = useSelector((state) => state.projects);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timesheetsValidationSchema)
  });

  const projectsById = projects.filter((project) => {
    let result;
    if (project.employees.length > 0) {
      for (let i = 0; i < project.employees.length; i++) {
        result = project.employees[i].employeeId?._id === id;
        if (result === true) {
          break;
        }
      }
    }
    return result;
  });

  useEffect(() => {
    dispatch(getTasks(token));
    dispatch(getProjects(token));
    projectID ? setValue('project', projectID) : null;
    projectID ? setTimeSheetInput({ project: projectID }) : null;
  }, []);

  const onConfirm = () => {
    !modalContent.content.includes('logout')
      ? (dispatch(addTimeSheet(timeSheetInput, token)), dispatch(confirmModalClose()))
      : dispatch(logout()),
      dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onSubmit = (e) => {
    setTimeSheetInput({
      description: e.description,
      date: e.date,
      hours: e.hours,
      task: e.task,
      employee: id,
      project: e.project
    });
    const content = `Are you sure you want to create a new Timesheet'`;
    dispatch(confirmModalOpen(content));
  };

  const resetForm = () => {
    reset(timeSheetInput);
  };

  const redirect = () => {
    props.history.push('/employees/home');
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
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.card}>
            {<div className={styles.cardTitle}>Create Timesheet</div>}
            <Input
              register={register}
              label={'Description'}
              name="description"
              type="text"
              error={errors.description?.message}
              placeholder={'Description'}
            />
            <Input
              register={register}
              label={'Date'}
              name="date"
              type="date"
              error={errors.date?.message}
            />
            <Input
              register={register}
              label={'Hours'}
              name="hours"
              type="number"
              error={errors.hours?.message}
              placeholder={'Hours'}
            />
            <div className={styles.cardField}>
              <label>Task</label>
              <Select
                register={register}
                options={tasks}
                keyMap={'_id'}
                title={'Task'}
                name={'task'}
                fieldToShow={'description'}
                error={errors.task?.message}
              />
            </div>
            <div className={styles.cardField}>
              <label>Project</label>
              <Select
                register={register}
                options={projectsById}
                keyMap={'_id'}
                title={'Project'}
                fieldToShow={'name'}
                name={'project'}
                error={errors.project?.message}
              />
            </div>
            <div className={styles.cardButton}>
              <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
              <Buttons type="submit" variant="primary" name="Confirm" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeTimeSheet;
