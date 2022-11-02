import { put, post } from '../Methods/TaskMethods';

const id = window.location.search.slice(1, 25);
let taskType = window.location.search.slice(26);
const setTask = async (data, id) => {
  try {
    await (id ? put(data, id) : post(data));
    window.location.assign('/tasks');
  } catch (error) {
    return error;
  }
};

const Form = () => {
  return (
    <div className="alert">
      <button onClick={() => window.location.assign('/tasks')}>X</button>
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
          <p>Task type</p>
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
        <div>
          <input type="submit" value="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default Form;
