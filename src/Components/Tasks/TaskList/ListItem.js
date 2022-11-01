const ListItem = ({ taskList, deleteTask, setPutPost }) => {
  return (
    <tr className="rows">
      <td>{taskList._id}</td>
      <td>{taskList.description}</td>
      <td>
        <button onClick={() => setPutPost(true, taskList._id)}>UPDATE</button>
      </td>
      <td>
        <button onClick={() => deleteTask(taskList._id)}>DEL</button>
      </td>
    </tr>
  );
};

export default ListItem;
