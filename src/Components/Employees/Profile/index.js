import React from 'react';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './profile.module.css';

const EmployeesProfile = () => {
  return (
    <div className={styles.profileWrapper}>
      <Sidebar />
      <h1> Profile </h1>
    </div>
  );
};

export default EmployeesProfile;
