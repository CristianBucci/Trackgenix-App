import { useEffect, useState } from 'react';
import List from './List/List';
import AddSuperAdmin from './AddSuperAdmin/AddSuperAdmin';
import styles from './super-admins.module.css';

const SuperAdmins = () => {
  const [superAdminsList, setSuperAdminsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}superAdmin/`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdminsList(response.data);
      });
  }, []);

  const deleteSuperAdmin = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}superAdmin/${id}`, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API_URL}superAdmin/`)
        .then((response) => response.json())
        .then((response) => {
          setSuperAdminsList(response.data);
        });
    });
  };

  const addSuperAdmin = (input) => {
    fetch(`${process.env.REACT_APP_API_URL}superAdmin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      })
      .then(() => {
        fetch(`${process.env.REACT_APP_API_URL}superAdmin/`)
          .then((response) => response.json())
          .then((response) => {
            setSuperAdminsList(response.data);
          });
      });
  };

  return (
    <div className={styles.container}>
      <h2>SuperAdmins</h2>
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
