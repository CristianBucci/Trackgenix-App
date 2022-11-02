import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './employees.module.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const json = await response.json();
      setEmployees(json.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    setEmployees([...employees.filter((employee) => employee._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <List employees={employees} setEmployees={setEmployees} deleteEmployee={deleteEmployee} />
    </div>
  );
};

export default Employees;
