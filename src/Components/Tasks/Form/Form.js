import { put, post } from '../Methods/TaskMethods';
import styles from '../tasks.module.css';

const id = window.location.search.slice(1, 25);
let taskType = window.location.search.slice(26);
const setTask = async (data, id) => {
  try {
    await (id ? put(data, id) : post(data));
  } catch (error) {
    return error;
  }
};

const TasksForm = () => {
  return (
    <div className={styles.formContainer}>
      <span>
        <button onClick={() => window.location.assign('/tasks')}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
        </button>
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
        <input type="submit" value="Confirm" />
      </form>
    </div>
  );
};

export default TasksForm;
