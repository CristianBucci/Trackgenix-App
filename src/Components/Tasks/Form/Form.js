import { put, post } from '../Methods/TaskMethods';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Shared/Inputs';
import styles from '../tasks.module.css';
import Buttons from '../../Shared/Button/index';

const setTask = async (data, id) => {
  try {
    await (id ? put(data, id) : post(data));
  } catch (error) {
    return error;
  }
};

const TasksForm = () => {
  const params = useParams();
  const id = params.id ? params.id : '';
  const [taskInput, setTaskInput] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      const json = await response.json();
      setTaskInput(json.data.description);
    } catch (error) {
      alert('Could not GET TimeSheets.', error);
    }
  }, []);

  return (
    <div className={styles.formContainer}>
      <span>
        <Link to={'/tasks'}>
          <button>
            <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
          </button>
        </Link>
      </span>
      {id ? (
        <p>
          Edit task {taskInput} whit id: {id}
        </p>
      ) : (
        <p>Create new task</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          id ? setTask(taskInput, id) : setTask(taskInput);
        }}
      >
        <div>
          <Input
            label={'Task Type'}
            name="taskType"
            required
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder={'Task Type'}
          />
        </div>
        <Buttons type="submit" variant="primary" name="Confirm" />
        <Link to={'/tasks'}>
          <Buttons variant="secondary" name="Cancel" />
        </Link>
      </form>
    </div>
  );
};

export default TasksForm;
