import ListItem from './ListItem';
import styles from '../tasks.module.css';
import { Link } from 'react-router-dom';

const List = ({ tasksList = [], deleteTask }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th id="id">ID</th>
          <th id="description">Description</th>
          <td>
            <Link to={'tasks/form'}>
              <button>
                <img src={`${process.env.PUBLIC_URL}/assets/images/add.svg`} alt="Edit icon" />
                Add new task
              </button>
            </Link>
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
