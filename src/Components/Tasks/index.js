import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import { useLocation } from 'react-router-dom';
import styles from './tasks.module.css';

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemId, setItemId] = useState('');
  const location = useLocation();

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasksList(data.data);
    } catch (error) {
      alert('Could not GET Tasks.', error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Tasks</h2>
      <Table
        data={tasksList}
        headers={['ID', 'Description']}
        dataValues={['_id', 'description']}
        location={location}
        setShowModal={setShowModal}
        setItemId={setItemId}
      />
    </section>
  );
};

export default Tasks;
