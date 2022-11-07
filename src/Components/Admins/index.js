import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import styles from './admins.module.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const responseJson = await response.json();
      setAdmins(responseJson.data);
    } catch (error) {
      alert('Could not GET Admins.', error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, [admins]);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('Admin removed.');
        setAdmins([...admins.filter((admin) => admin._id !== id)]);
      } else {
        alert('Admin could not be removed.');
      }
    } catch (error) {
      alert('Admin could not be removed.', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>admins</h2>
      </div>
      <Table
        data={admins}
        headers={['First name', 'Last name', 'Email']}
        dataValues={['name', 'lastName', 'email']}
        modalFunction={deleteAdmin}
      />
    </div>
  );
};

export default Admins;
