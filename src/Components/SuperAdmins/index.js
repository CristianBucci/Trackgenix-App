import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import { useLocation } from 'react-router-dom';
import styles from './super-admins.module.css';

const SuperAdminsList = () => {
  const [superAdminsList, setSuperAdminsList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemId, setItemId] = useState('');
  const location = useLocation();

  const getList = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`);
      const data = await response.json();
      setSuperAdminsList(data.data);
    } catch (error) {
      alert('Could not GET SuperAdmins.', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>superadmins</h2>
      </div>
      <Table
        data={superAdminsList}
        headers={['First name', 'Last name', 'Email']}
        dataValues={['name', 'lastName', 'email']}
        location={location}
        setShowModal={setShowModal}
        setItemId={setItemId}
      />
    </div>
  );
};

export default SuperAdminsList;
