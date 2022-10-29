import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}superAdmin/`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmins(response.data);
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
          const deleteSuperAdmin = (id) => {
            setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== id)]);
          };
          const deleteHandler = () => {
            deleteSuperAdmin(superAdmin._id);
          };

          return (
            <div className={styles.row} key={superAdmin._id}>
              <div className={styles.data}>
                {superAdmin.name} {superAdmin.lastName}
              </div>
              <div className={styles.data}>{superAdmin.email}</div>
              <div className={styles.actionButtons}>
                <button>o</button>
                <button onClick={() => deleteHandler(superAdmin.id)}>x</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SuperAdmins;
