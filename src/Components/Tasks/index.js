import React, { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import List from './TaskList/List';
import { del, post, put } from './Methods/TaskMethods';

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);

  useEffect(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await res.json();
      setTasksList(data.data);
    } catch (error) {
      return error;
    }
  }, []);

  const deleteTask = async (id) => {
    await del(id);
    setTasksList([...tasksList.filter((task) => task._id !== id)]);
  };

  const setTask = async (data, id) => {
    try {
      await (id ? put(data, id) : post(data));
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const resData = await res.json();
      setTasksList(resData.data);
    } catch (error) {
      return error;
    }
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List tasksList={tasksList} deleteTask={deleteTask} setTask={setTask} />
    </section>
  );
};

export default Tasks;
