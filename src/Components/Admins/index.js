import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import { useLocation } from 'react-router-dom';
import styles from './admins.module.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemId, setItemId] = useState('');
  const location = useLocation();

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      alert('Could not GET Admins.', error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, [admins]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>admins</h2>
      </div>
      <Table
        data={admins}
        headers={['First name', 'Last name', 'Email']}
        dataValues={['name', 'lastName', 'email']}
        location={location}
        setShowModal={setShowModal}
        setItemId={setItemId}
      />
    </div>
  );
};

export default Admins;
