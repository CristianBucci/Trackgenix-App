import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ModalConfirm, ModalMessage } from '../../Shared/Modal/Modal';
import Input from '../../Shared/Inputs';
import Datepicker from '../../Shared/Datepicker';
import Select from '../../Shared/Select/index';
import Buttons from '../../Shared/Button/index';
import styles from './form.module.css';

const Form = (props) => {
  const [timeSheetInput, setTimeSheetInput] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });
  const [formText, setFormText] = useState('Add timeSheet');
  const [employees, setEmployees] = useState();
  const [tasks, setTasks] = useState();
  const [projects, setProjects] = useState();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const params = useParams();
  const id = params.id ? params.id : '';

  const onSubmit = async (e) => {
    e.preventDefault();
    setModalContent({
      title: 'Confirm',
      content: `Are you sure you want to ${
        id ? 'edit the TimeSheet with id ' + id : 'create a new TimeSheet'
      }?`
    });
    setShowModalConfirm(true);
  };

  const modalFunction = () => {
    id ? updateTimeSheet() : createTimeSheet();
  };

  const redirect = () => {
    props.history.push('/timesheets');
  };

  useEffect(async () => {
    try {
      const employees = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const jsonEmployees = await employees.json();
      setEmployees(jsonEmployees.data);

      const tasks = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const jsonTasks = await tasks.json();
      setTasks(jsonTasks.data);

      const projects = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const jsonProjects = await projects.json();
      setProjects(jsonProjects.data);
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET data! ${error.message}` });
      setShowModalMessage(true);
    }
  }, []);

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
          method: 'GET'
        });
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
        alert('Could not GET TimeSheets.', error);
      }
    } else {
      return null;
    }
  }, []);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const createTimeSheet = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: timeSheetInput.description,
          date: timeSheetInput.date,
          hours: timeSheetInput.hours,
          task: timeSheetInput.task,
          employee: timeSheetInput.employee,
          project: timeSheetInput.project
        })
      });
      if (response.status === 201) {
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not create new TimeSheet! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not create new TimeSheet! ${error.message}`
      });
      setShowModalMessage(true);
    }
  };

  const updateTimeSheet = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: timeSheetInput.description,
          date: timeSheetInput.date,
          hours: timeSheetInput.hours,
          task: timeSheetInput.task,
          employee: timeSheetInput.employee,
          project: timeSheetInput.project
        })
      });
      if (response.status === 200) {
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not update TimeSheet! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not update TimeSheet! ${error.message}`
      });
      setShowModalMessage(true);
    }
  };

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
        modalId={id}
      />
      <ModalMessage
        show={showModalMessage}
        closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={redirect}
      />
      <div>
        <form onSubmit={onSubmit}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>{formText}</div>
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
