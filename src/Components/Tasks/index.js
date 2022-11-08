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
      let response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      response = await response.json();
      setTasksList(response.data);
    } catch (error) {
      alert('Could not GET Tasks.', error);
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('Tasks removed.');
        setTasksList([...tasksList.filter((task) => task._id !== id)]);
      } else {
        alert('Tasks could not be removed.');
      }
    } catch (error) {
      alert('Tasks could not be removed.', error);
    }
  };

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
