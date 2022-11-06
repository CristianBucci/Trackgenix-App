import styles from '../tasks.module.css';
import { Link } from 'react-router-dom';

const ListItem = ({ taskList, deleteTask }) => {
  return (
    <tr className={styles.rows}>
      <td>{taskList._id}</td>
      <td>{taskList.description}</td>
      <td>
        <Link to={`tasks/${taskList._id}`}>
          <button>
            <img src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`} alt="Edit icon" />
          </button>
        </Link>
        <button onClick={() => deleteTask(taskList._id)}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`} alt="Delete icon" />
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
