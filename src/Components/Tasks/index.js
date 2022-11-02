import React, { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import List from './TaskList/List';
import { del } from './Methods/TaskMethods';

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to get tasks');
      }
      const data = await response.json();
      setTasksList(data.data);
    } catch (error) {
      alert(error);
    }
  }, []);

  const deleteTask = async (id) => {
    (await del(id)) ? setTasksList([...tasksList.filter((task) => task._id !== id)]) : '';
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Tasks</h2>
      <List tasksList={tasksList} deleteTask={deleteTask} />
    </section>
  );
};

export default Tasks;
