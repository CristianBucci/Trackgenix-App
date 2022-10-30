import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdminsList() {
  const [superAdminsList, setSuperAdminsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}superAdmin/`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdminsList(response.data);
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
        {superAdminsList.map((superAdmin) => {
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
                <button onClick={() => deleteHandler()}>x</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SuperAdminsList;
