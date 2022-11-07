import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import styles from './tasks.module.css';

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);

  useEffect(async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      response = await response.json();
      setTasksList(response.data);
    } catch (error) {
      alert('Could not GET Tasks.', error);
    }
  }, []);

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
        modalFunction={deleteTask}
      />
    </section>
  );
};

export default Tasks;
