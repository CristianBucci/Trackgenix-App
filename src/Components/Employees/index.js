import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './employees.module.css';
import Modal from './Modal/modalDelete';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [err, setErr] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      setErr(error);
      alert(err);
    }
  }, []);

  const deleteEmployee = async (id) => {
    if (confirm('Are you sure that you want to delete this Employee?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
          method: 'DELETE'
        });
        setEmployees([...employees.filter((employees) => employees._id !== id)]);
        if (response.ok) {
          setEmployees(employees.filter((employee) => employee._id !== id));
          setModalTitle('Success');
        } else {
          setModalTitle('Error');
        }
        setShowModal(true);
      } catch (error) {
        setErr(error);
        alert('Employee could not be removed.', err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <List
        employees={employees}
        setEmployees={setEmployees}
        setShowModal={setShowModal}
        deleteEmployee={deleteEmployee}
      />
      {showModal ? <Modal title={modalTitle} setShowModal={setShowModal} /> : null}
    </div>
  );
};

export default Employees;
