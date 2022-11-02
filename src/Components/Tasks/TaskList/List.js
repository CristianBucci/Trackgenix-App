import ListItem from './ListItem';
import styles from '../tasks.module.css';

const form = () => {
  window.location.assign('tasks/form');
};

const List = ({ tasksList = [], deleteTask }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th id="id">ID</th>
          <th id="description">Description</th>
          <td>
            <button onClick={() => form()}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/add.svg`} alt="Edit icon" />
              Add new task
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
        {tasksList.map((task) => (
          <ListItem key={task.id} taskList={task} deleteTask={deleteTask} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
