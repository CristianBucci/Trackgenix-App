import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
  // eslint-disable-next-line no-unused-vars
  const [superAdmins, saveSuperAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}superAdmin/`)
      .then((response) => response.json())
      .then((response) => {
        saveSuperAdmins(response.data);
      });
  }, []);
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <div className={styles.table}>
        <div className={styles.column}>
          <li className={styles.listTitle}>Name</li>
          {superAdmins.map((superAdmin) => {
            return (
              <li key={superAdmin.id}>
                {superAdmin.name} {superAdmin.lastName}
              </li>
            );
          })}
        </div>
        <div className={styles.column}>
          <li className={styles.listTitle}>Email</li>
          {superAdmins.map((superAdmin) => {
            return <li key={superAdmin.id}>{superAdmin.email}</li>;
          })}
        </div>
        <div className={styles.column}>
          <li className={styles.listTitle}>Actions</li>
          {superAdmins.map((superAdmin) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div>
                <button key={superAdmin.id}>o</button>
                <button key={superAdmin.id}>x</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SuperAdmins;
