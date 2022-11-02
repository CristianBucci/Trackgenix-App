import styles from '../tasks.module.css';

const ListItem = ({ taskList, deleteTask }) => {
  return (
    <tr className={styles.rows}>
      <td>{taskList._id}</td>
      <td>{taskList.description}</td>
      <td>
        <button
          onClick={() =>
            window.location.assign(`tasks/form?${taskList._id}&${taskList.description}`)
          }
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`} alt="Edit icon" />
        </button>
        <button onClick={() => deleteTask(taskList._id)}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`} alt="Delete icon" />
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
