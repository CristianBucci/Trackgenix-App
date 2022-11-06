import { Link } from 'react-router-dom';
import './listItem.module.css';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };
  const projectsEmployeesNames = listItem.employees
    .map((employee) => (employee.employeeId ? employee.employeeId : ''))
    .map((projectEmployee) => [projectEmployee.name, ' ', projectEmployee.lastName]);
  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>{projectsEmployeesNames}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>Delete</button>
        <Link to={`/projects/${listItem._id}`}>
          <button>Edit</button>
        </Link>
      </td>
    </tr>
  );
};
export default ListItem;
