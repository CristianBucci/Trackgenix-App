import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ModalConfirm from '../../Shared/Modal/ModalConfirm/index';
import ModalMessage from '../../Shared/Modal/ModalMessage/index';
import Input from '../../Shared/Inputs';
import Datepicker from '../../Shared/Datepicker';
import Select from '../../Shared/Select/index';
import Buttons from '../../Shared/Button/index';

import { useSelector, useDispatch } from 'react-redux';
import {
  confirmModalOpen,
  messageModalOpen,
  confirmModalClose,
  messageModalClose
} from '../../../redux/timesheets/actions';
import { addTimeSheet, updateTimeSheet } from '../../../redux/timesheets/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import { getTasks } from '../../../redux/tasks/thunks';
import getProjects from '../../../redux/projects/thunks';

import styles from './form.module.css';

const Form = (props) => {
  const dispatch = useDispatch();

  const { modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.timesheets
  );

  const params = useParams();
  const id = params.id && params.id;
  const [timeSheetInput, setTimeSheetInput] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });
  const [formText, setFormText] = useState('Add timeSheet');

  const { list: employees } = useSelector((state) => state.employees);
  const { list: tasks } = useSelector((state) => state.tasks);
  const { list: projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getTasks());
    dispatch(getProjects());
  }, []);

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`);
        const json = await response.json();
        setFormText('Update TimeSheet');
        setTimeSheetInput({
          description: json.data.description,
          date: fixDate(json.data.date),
          hours: json.data.hours,
          task: json.data.task === null ? 'Not found in DB' : json.data.task['_id'],
          employee: json.data.employee === null ? 'Not found in DB' : json.data.employee['_id'],
          project: json.data.project === null ? 'Not found in DB' : json.data.project['_id']
        });
      } catch (error) {
        dispatch(
          messageModalOpen({ title: 'ERROR', content: `Could not GET TimeSheets. ${error}` })
        );
      }
    } else {
      return null;
    }
  }, []);
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
    e.preventDefault();
    const content = `Are you sure you want to ${
      id ? 'edit the TimeSheet with id ' + id : 'create a new TimeSheet'
    }?`;
    dispatch(confirmModalOpen(content));
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
        <form onSubmit={onSubmit}>
          <div className={styles.card}>
            {<div className={styles.cardTitle}>{formText}</div>}
            <Input
              label={'Description'}
              name="description"
              required
              type="text"
              value={timeSheetInput.description}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, description: e.target.value });
              }}
              placeholder={'Description'}
            />
            <Datepicker
              label={'Date'}
              required
              name="date"
              type="date"
              value={timeSheetInput.date}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, date: e.target.value });
              }}
            />
            <Input
              label={'Hours'}
              name="hours"
              required
              type="number"
              value={timeSheetInput.hours}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, hours: e.target.value });
              }}
              placeholder={'Hours'}
            />
            <div className={styles.cardField}>
              <label>Task</label>
              <Select
                value={timeSheetInput.task}
                options={tasks}
                keyMap={'_id'}
                title={'Task'}
                fieldToShow={'description'}
                isDisabled={false}
                onChange={(value) => {
                  setTimeSheetInput({ ...timeSheetInput, task: value });
                }}
              ></Select>
            </div>
            <div className={styles.cardField}>
              <label>Employee</label>
              <Select
                value={timeSheetInput.employee}
                options={employees}
                keyMap={'_id'}
                title={'Employee'}
                fieldToShow={'name'}
                second={'lastName'}
                isDisabled={false}
                onChange={(value) => {
                  setTimeSheetInput({ ...timeSheetInput, employee: value });
                }}
              ></Select>
            </div>
            <div className={styles.cardField}>
              <label>Project</label>
              <Select
                value={timeSheetInput.project}
                options={projects}
                keyMap={'_id'}
                title={'Project'}
                fieldToShow={'name'}
                isDisabled={false}
                onChange={(value) => {
                  setTimeSheetInput({ ...timeSheetInput, project: value });
                }}
              ></Select>
            </div>
            <div className={styles.cardButton}>
              <Buttons type="submit" variant="primary" name="Confirm" />
              <Buttons
                variant="secondary"
                name="Cancel"
                onClick={() => props.history.push('/timesheets')}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
