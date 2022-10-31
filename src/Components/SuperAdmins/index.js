import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './super-admins.module.css';

const SuperAdminsList = () => {
  const formURL = './super-admins/form';
  const [superAdminsList, setSuperAdminsList] = useState([]);
  const getList = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`);
      response = await response.json();
      setSuperAdminsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      getList();
    } catch (error) {
      alert(error);
    }
  }, []);

  const onClick = () => {
    window.location.assign(formURL);
  };

  const deleteSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'DELETE'
      });
      getList();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>SuperAdmins</h2>
          <button onClick={onClick}>Create new</button>
        </div>
      </div>
      <List
        superAdminsList={superAdminsList}
        setSuperAdminsList={setSuperAdminsList}
        deleteSuperAdmin={deleteSuperAdmin}
      />
    </div>
  );
};

export default SuperAdminsList;
