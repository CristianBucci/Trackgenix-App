import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './FormModal/index';
import styles from './form.module.css';
import Input from '../../Shared/Inputs';

const Form = (props) => {
  const [timeSheetInput, setTimeSheetInput] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    employee: '',
    project: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formMode, setFormMode] = useState(true);
  const [formText, setFormText] = useState('Add timeSheet');
  const [employees, setEmployees] = useState();
  const [tasks, setTasks] = useState();
  const [projects, setProjects] = useState();
  const params = useParams();
  const id = params.id ? params.id : '';

  useEffect(async () => {
    try {
      const employees = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const jsonEmployees = await employees.json();
      setEmployees(jsonEmployees.data);

      const tasks = await fetch(`${process.env.REACT_APP_API_URL}/tasks/`);
      const jsonTasks = await tasks.json();
      setTasks(jsonTasks.data);

      const projects = await fetch(`${process.env.REACT_APP_API_URL}/projects/`);
      const jsonProjects = await projects.json();
      setProjects(jsonProjects.data);
    } catch (error) {
      alert('Error.', error);
    }
  }, []);

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
          method: 'GET'
        });
        const json = await response.json();
        setFormMode(false);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    if (formMode) {
      event.preventDefault();
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
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
          alert('TimeSheet Added.');
          props.history.push('/timesheets');
        } else {
          setShowModal(true);
          setServerError('TimeSheet could not be Added.');
        }
      } catch (error) {
        setShowModal(true);
        setServerError('TimeSheet could not be Updated.');
      }
    } else {
      event.preventDefault();
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
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
          alert('TimeSheet Updated.');
          props.history.push('/timesheets');
        } else {
          setShowModal(true);
          setServerError('TimeSheet could not be Updated.');
        }
      } catch (error) {
        setShowModal(true);
        setServerError('TimeSheet could not be Updated.');
      }
    }
  };

  return (
    <div>
      <Modal show={showModal} title={serverError} closeModal={closeModal} />
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
          <div className={styles.cardField}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              required
              value={timeSheetInput.date}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, date: e.target.value });
              }}
            />
          </div>
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
            <select
              value={timeSheetInput.task}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, task: e.target.value });
              }}
            >
              <option>--Select Task--</option>
              {tasks?.map((task) => {
                return (
                  <option key={task._id} value={task._id}>
                    {task.description}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.cardField}>
            <label>Employee</label>
            <select
              value={timeSheetInput.employee}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, employee: e.target.value });
              }}
            >
              <option>--Select Employee--</option>
              {employees?.map((employee) => {
                return (
                  <option key={employee._id} value={employee._id}>
                    {employee.lastName} {employee.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.cardField}>
            <label>Project</label>
            <select
              value={timeSheetInput.project}
              onChange={(e) => {
                setTimeSheetInput({ ...timeSheetInput, project: e.target.value });
              }}
            >
              <option>--Select Project--</option>
              {projects?.map((project) => {
                return (
                  <option key={project._id} value={project._id}>
                    {project.name} {project.lastName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.cardButton}>
            <div>
              <button className={styles.cancel} onClick={() => props.history.push('/timesheets')}>
                Cancel
              </button>
            </div>
            <div>
              <button className={styles.confirm} type="submit">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
