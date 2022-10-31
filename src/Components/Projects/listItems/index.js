import { useEffect, useState } from 'react';
const ListItem = ({ listItem, deleteItem }) => {
  const [employeeName, setEmployeeName] = useState([]);
  useEffect(async () => {
    try {
      const employee = listItem.employees.find((employee) => employee);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${employee.employeeId}`
      );
      const data = await response.json();
      setEmployeeName(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>
        {employeeName.name} {employeeName.lastName}
      </td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>delete</button>
      </td>
      <td>
        <button>edit</button>
      </td>
    </tr>
  );
};

export default ListItem;
