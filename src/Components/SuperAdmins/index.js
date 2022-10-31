import { useEffect, useState } from 'react';
import List from './List/List';
import AddSuperAdmin from './AddSuperAdmin/AddSuperAdmin';
import Form from './Form/Form';
import styles from './super-admins.module.css';

const SuperAdmins = () => {
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

  const addSuperAdmin = async (input) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });
      response = await response.json();
      alert(response.message);
      getList();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>SuperAdmins</h2>
      <Form />
      <AddSuperAdmin
        superAdminsList={superAdminsList}
        setSuperAdminsList={setSuperAdminsList}
        addSuperAdmin={addSuperAdmin}
      />
      <List
        superAdminsList={superAdminsList}
        setSuperAdminsList={setSuperAdminsList}
        deleteSuperAdmin={deleteSuperAdmin}
      />
    </div>
  );
};

export default SuperAdmins;
