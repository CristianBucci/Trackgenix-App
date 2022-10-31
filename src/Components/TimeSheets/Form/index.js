import { useState, useEffect } from 'react';
import Modal from './Form Modal/index';
import FormText from './Form Title';

function Form() {
  const [timeSheetInput, setTimeSheetInput] = useState({
    description: 'Create Test',
    date: '2022-06-24T03:00:00.000Z',
    hours: 3,
    task: '635fec26bd648fd82aab6946',
    employee: '635feed4d4914c0ceb5a98c4',
    project: '63600509d4914c0ceb5a99f8'
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
          date: json.data.date,
          hours: json.data.hours,
          task: json.data.task['_id'],
          employee: json.data.employee['_id'],
          project: json.data.project['_id']
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      return null;
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    if (formMode) {
      event.preventDefault();
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
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
      const content = await rawResponse.json();
      if (!content.error) {
        window.location.assign('/time-sheets');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    } else {
      event.preventDefault();
      const fullUrl = window.location.href;
      const id = fullUrl.substring(fullUrl.lastIndexOf('=') + 1);
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
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
      const content = await rawResponse.json();
      if (!content.error) {
        window.location.assign('/time-sheets');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    }
  };

  return (
    <div>
      <Modal show={showModal} title={serverError} closeModal={closeModal} />
      <form onSubmit={onSubmit}>
        <div>
          <FormText title={formText} />
        </div>
        <div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              required
              value={timeSheetInput.description}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="text"
              name="date"
              required
              value={timeSheetInput.date}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              required
              value={timeSheetInput.hours}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Task</label>
            <input
              type="text"
              name="task"
              required
              value={timeSheetInput.task}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Employee</label>
            <input
              type="text"
              name="employee"
              required
              value={timeSheetInput.employee}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Project</label>
            <input
              type="text"
              name="project"
              required
              value={timeSheetInput.project}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <div>
            <button onClick={() => window.location.assign('/time-sheets')}>Cancel</button>
          </div>
          <div>
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
