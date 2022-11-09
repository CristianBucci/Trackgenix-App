import { put, post } from '../Methods/TaskMethods';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../tasks.module.css';
import Buttons from '../../Shared/Button/index';
let taskType = '';
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
          Edit task {taskType} whit {id}
        </p>
      ) : (
        <p>Create new task</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          id ? setTask(taskType, id) : setTask(taskType);
        }}
      >
        <div>
          <p>Select task type</p>
          <label>
            <input
              type="radio"
              name="taskType"
              value="FE"
              required
              onChange={(e) => (taskType = e.target.value)}
            />
            FE
          </label>
          <label>
            <input
              type="radio"
              name="taskType"
              value="BE"
              required
              onChange={(e) => (taskType = e.target.value)}
            />
            BE
          </label>
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
