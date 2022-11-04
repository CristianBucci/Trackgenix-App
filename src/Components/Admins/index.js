import { useEffect, useState } from 'react';
import List from './List';
import styles from './admins.module.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const responseJson = await response.json();
      setAdmins(responseJson.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'DELETE'
      });
      const updatedAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(updatedAdmins);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={styles.container}>
      <List list={admins} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default Admins;
