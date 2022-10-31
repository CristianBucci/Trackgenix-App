import { useEffect, useState } from 'react';
import List from './List';
// import styles from './employees.module.css';

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((json) => {
        console.log('data', json);
        setEmployees(json);
      });
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}employees/${id}`, {
      method: 'DELETE'
    });
    location.reload();
  };

  return (
    <>
      <List list={employees} setEmployees={setEmployees} deleteEmployee={deleteEmployee} />
    </>
  );
}

export default Employees;
