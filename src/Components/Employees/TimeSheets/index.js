import React from 'react';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './timeSheets.module.css';

const EmployeeTimesheet = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div>Employee Timesheet</div>
    </div>
  );
};

export default EmployeeTimesheet;
