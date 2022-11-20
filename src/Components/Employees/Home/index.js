import React from 'react';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './home.module.css';

const HomeEmployees = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div>HomeEmployees</div>
    </div>
  );
};

export default HomeEmployees;
