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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      alert('Could not GET Employees.', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

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
