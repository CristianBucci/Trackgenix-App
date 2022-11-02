import { useEffect, useState } from 'react';

const ListItem = ({ listItem, deleteItem }) => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployeeData(data.data);
    } catch (error) {
      alert('Could not GET Employeees', error);
    }
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
  };
  const projectsEmployee = listItem.employees.map((e) => e.employeeId);
  const employeeNames = employeeData
    .filter((emp) => projectsEmployee.includes(emp._id))
    .map((emp) => emp.name)
    .join(',');
  console.log(employeeData.filter((emp) => projectsEmployee.includes(emp._id)));
  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>{employeeNames}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>delete</button>
      </td>
      <td>
        <button
          onClick={() => {
            window.location.assign(`/projects/form?id=${listItem._id}`);
          }}
        >
          edit
        </button>
      </td>
    </tr>
  );
};
export default ListItem;
