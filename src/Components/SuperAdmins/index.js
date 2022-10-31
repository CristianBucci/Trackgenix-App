import { useEffect, useState } from 'react';
import List from './List/List';
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
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className={styles.container}>
      <h2>SuperAdmins</h2>
      <List
        superAdminsList={superAdminsList}
        setSuperAdminsList={setSuperAdminsList}
        deleteSuperAdmin={deleteSuperAdmin}
      />
    </div>
  );
};

export default SuperAdmins;
