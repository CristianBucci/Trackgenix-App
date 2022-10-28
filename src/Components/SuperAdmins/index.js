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
    </section>
  );
}

export default SuperAdmins;
