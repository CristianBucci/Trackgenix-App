import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import styles from './super-admins.module.css';

const SuperAdminsList = () => {
  const [superAdminsList, setSuperAdminsList] = useState([]);
  const [err, setErr] = useState('');

  const getList = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`);
      response = await response.json();
      setSuperAdminsList(response.data);
    } catch (error) {
      setErr(error);
      alert(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const deleteSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'DELETE'
      });
      getList();
    } catch (error) {
      setErr(error);
      alert(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>superadmins</h2>
      </div>
      <Table
        data={superAdminsList}
        headers={['First name', 'Last name', 'Email']}
        dataValues={['name', 'lastName', 'email']}
        modalFunction={deleteSuperAdmin}
      />
    </div>
  );
};

export default SuperAdminsList;
