import ListItem from './ListItem';

const form = () => {
  window.location.assign('tasks/form');
};

const List = ({ tasksList = [], deleteTask }) => {
  return (
    <table>
      <thead>
        <tr>
          <th id="id">ID</th>
          <th id="description">Description</th>
          <td>
            <button onClick={() => form()}>ADD</button>
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
