import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
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
        <div className={styles.titles}>
          <div className={styles.data}>Name</div>
          <div className={styles.data}>Email</div>
          <div className={styles.actionButtons}>Actions</div>
        </div>
        {superAdmins.map((superAdmin) => {
          return (
            <div className={styles.row} key={superAdmin.id}>
              <div className={styles.data}>
                {superAdmin.name} {superAdmin.lastName}
              </div>
              <div className={styles.data}>{superAdmin.email}</div>
              <div className={styles.actionButtons}>
                <button>o</button>
                <button>x</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SuperAdmins;
