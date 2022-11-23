import React from 'react';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './timeSheet.module.css';

const EmployeeTimesheet = () => {
  return (
    <div className={styles.timesheetsWrapper}>
      <Sidebar />
      <h1> Timesheets </h1>
    </div>
  );
};

export default EmployeeTimesheet;
