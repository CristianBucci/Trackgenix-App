import { useEffect, useState } from 'react';

const ListItem = ({ listItem, deleteItem }) => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployeeData(data.data);
    } catch (error) {
      alert('Could not get Employeees', error);
    }
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
    {
      alert('Project Deleted');
    }
  };
  const projectsEmployee = listItem.employees.map((e) => e.employeeId);
  const employeeNames = employeeData
    .filter((emp) => projectsEmployee.includes(emp._id))
    .map((emp) => emp.name)
    .join(',');
  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>{employeeNames}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>Delete</button>
      </td>
      <td>
        <button
          onClick={() => {
            window.location.assign(`/projects/form?id=${listItem._id}`);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};
export default ListItem;
