const ListItem = ({ taskList, deleteTask }) => {
  return (
    <tr className="rows">
      <td>{taskList._id}</td>
      <td>{taskList.description}</td>
      <td>
        <button
          onClick={() =>
            window.location.assign(`tasks/form?${taskList._id}&${taskList.description}`)
          }
        >
          UPDATE
        </button>
      </td>
      <td>
        <button onClick={() => deleteTask(taskList._id)}>DEL</button>
      </td>
    </tr>
  );
};

export default ListItem;
