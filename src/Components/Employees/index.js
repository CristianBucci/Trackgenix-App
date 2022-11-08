import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import { useLocation } from 'react-router-dom';
import styles from './employees.module.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemId, setItemId] = useState('');
  const location = useLocation();

  const getEmployees = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      response = await response.json();
      setEmployees(response.data);
    } catch (error) {
      alert('Could not GET Employees.', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('SuperAdmin removed.');
        setEmployees([...employees.filter((employee) => employee._id !== id)]);
      } else {
        alert('SuperAdmin could not be removed.');
      }
    } catch (error) {
      alert('SuperAdmin could not be removed.', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>employees</h2>
      </div>
      <Table
        data={employees}
        headers={['First name', 'Last name', 'Phone', 'Email']}
        dataValues={['name', 'lastName', 'phone', 'email']}
        location={location}
        setShowModal={setShowModal}
        setItemId={setItemId}
      />
    </div>
  );
};

export default Employees;
