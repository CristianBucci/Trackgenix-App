import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm/index';
import ModalMessage from 'Components/Shared/Modal/ModalMessage/index';
import Input from 'Components/Shared/Inputs';
import Select from 'Components/Shared/Select/index';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/timesheets/actions';
import { addTimeSheet, updateTimeSheet, getByIdTimesheet } from 'redux/timesheets/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { getProjects } from 'redux/projects/thunks';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { timesheetsValidationSchema } from './validations';

const Form = (props) => {
  const dispatch = useDispatch();

  const {
    modalContent,
    showModalMessage,
    showConfirmModal,
    item: timesheet
  } = useSelector((state) => state.timesheets);

  const params = useParams();
  const id = params.id ? params.id : '';

  const [timeSheetInput, setTimeSheetInput] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });

  const { list: employees } = useSelector((state) => state.employees);
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

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTasks());
    dispatch(getProjects());
  }, []);

  useEffect(async () => {
    if (id) {
      dispatch(getByIdTimesheet(id));
    }
  }, []);

  useEffect(() => {
    if (timesheet && id) {
      console.log(timesheet);
      setValue('description', timesheet.description);
      setValue('date', fixDate(timesheet.date));
      setValue('hours', timesheet.hours);
      if (timesheet.task) {
        setValue('task', timesheet.task._id);
      }
      if (timesheet.employee) {
        setValue('employee', timesheet.employee._id);
      }
      if (timesheet.project) {
        setValue('project', timesheet.project._id);
      }

      setTimeSheetInput({
        description: timesheet.description,
        date: fixDate(timesheet.date),
        hours: timesheet.hours,
        task: timesheet.task,
        employee: timesheet.employee,
        project: timesheet.project
      });
    }
  }, [timesheet]);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const onConfirm = () => {
    id ? dispatch(updateTimeSheet(timeSheetInput, id)) : dispatch(addTimeSheet(timeSheetInput));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/timesheets');
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
      employee: e.employee,
      project: e.project
    });
    const content = `Are you sure you want to ${
      id ? 'edit the Timesheet with id ' + id : 'create a new Timesheet'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const resetForm = () => {
    reset(timeSheetInput);
  };

  console.log(timeSheetInput);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.card}>
            {<div className={styles.cardTitle}>{id ? 'Update Timesheet' : 'Create Timesheet'}</div>}
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
              <label>Employee</label>
              <Select
                register={register}
                options={employees}
                keyMap={'_id'}
                title={'Employee'}
                fieldToShow={'name'}
                second={'lastName'}
                name={'employee'}
                error={errors.employee?.message}
              />
            </div>
            <div className={styles.cardField}>
              <label>Project</label>
              <Select
                register={register}
                options={projects}
                keyMap={'_id'}
                title={'Project'}
                fieldToShow={'name'}
                name={'project'}
                error={errors.project?.message}
              />
            </div>
            <div className={styles.cardButton}>
              <Buttons
                variant="secondary"
                name="Cancel"
                onClick={() => props.history.push('/timesheets')}
              />
              <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
              <Buttons type="submit" variant="primary" name="Confirm" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
