import { useEffect, useState } from 'react';

const ListItem = ({ listItem, deleteItem }) => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployeeData(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [employeeData]);

  const handleDelete = (id) => {
    deleteItem(id);
  };
  const projectsEmployee = listItem.employees.map((e) => e.employeeId);
  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>{projectsEmployee}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>delete</button>
      </td>
      <td>
        <a
          onClick={() => {
            window.location.assign(`/projects/form?id=${listItem._id}`);
          }}
        >
          edit
        </a>
      </td>
    </tr>
  );
};
export default ListItem;
