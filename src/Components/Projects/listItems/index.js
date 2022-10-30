import { useEffect, useState } from 'react';
const ListItem = ({ listItem }) => {
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
        <a>delete</a>
      </td>
      <td>
        <a>edit</a>
      </td>
    </tr>
  );
};

export default ListItem;
