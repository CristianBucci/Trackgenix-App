import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './employees.module.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [err, setErr] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const json = await response.json();
      setEmployees(json.data);
    } catch (error) {
      setErr(error);
      alert(err);
    }
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('Employee removed.');
        setEmployees([...employees.filter((employee) => employee._id !== id)]);
      } else {
        alert('Employee could not be removed.');
      }
    } catch (error) {
      setErr(error);
      alert('Employee could not be removed.', err);
    }
  };

  return (
    <div className={styles.container}>
      <List employees={employees} setEmployees={setEmployees} deleteEmployee={deleteEmployee} />
    </div>
  );
};

export default Employees;
