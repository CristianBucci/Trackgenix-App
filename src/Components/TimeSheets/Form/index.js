import { useState, useEffect } from 'react';
import Modal from './Form Modal/index';
import styles from './form.module.css';

const Form = () => {
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

  const onChange = (e) => {
    setTimeSheetInput({ ...timeSheetInput, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    if (window.location.href.includes('id=')) {
      try {
        const fullUrl = window.location.href;
        const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
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
          window.location.assign('/timesheets');
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
        const fullUrl = window.location.href;
        const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
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
          window.location.assign('/timesheets');
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
          <div className={styles.cardField}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              required
              value={timeSheetInput.description}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardField}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              required
              value={timeSheetInput.date}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardField}>
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              required
              value={timeSheetInput.hours}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardField}>
            <label>Task</label>
            <input
              type="text"
              name="task"
              required
              value={timeSheetInput.task}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardField}>
            <label>Employee</label>
            <input
              type="text"
              name="employee"
              required
              value={timeSheetInput.employee}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardField}>
            <label>Project</label>
            <input
              type="text"
              name="project"
              required
              value={timeSheetInput.project}
              onChange={onChange}
            />
          </div>
          <div className={styles.cardButton}>
            <div>
              <button
                className={styles.cancel}
                onClick={() => window.location.assign('/timesheets')}
              >
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
