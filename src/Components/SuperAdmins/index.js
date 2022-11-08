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
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`);
      response = await response.json();
      setSuperAdminsList(response.data);
    } catch (error) {
      alert('Could not GET SuperAdmins.', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superadmin/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('SuperAdmin removed.');
        setSuperAdminsList([...superAdminsList.filter((superAdmin) => superAdmin._id !== id)]);
      } else {
        alert('SuperAdmin could not be removed.');
      }
    } catch (error) {
      alert('SuperAdmin could not be removed.', error);
    }
  };

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
