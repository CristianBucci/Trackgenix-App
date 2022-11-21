import React from 'react';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './home.module.css';

const HomeEmployees = () => {
  return (
    <div className={styles.projectsWrapper}>
      <Sidebar />
      <h1>Projects table </h1>
    </div>
  );
};

export default HomeEmployees;
