import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import styles from './timeSheets.module.css';

const TimeSheets = () => {
  const [timeSheets, setTimesheet] = useState([]);

  const getList = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/`);
      response = await response.json();
      setTimesheet(response.data);
    } catch (error) {
      alert('Could not GET TimeSheets.', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const deleteTimeSheet = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('Timesheet removed.');
        setTimesheet([...timeSheets.filter((timeSheet) => timeSheet._id !== id)]);
      } else {
        alert('Timesheet could not be removed.');
      }
    } catch (error) {
      alert('Timesheet could not be removed.', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>timesheets</h2>
      </div>
      <Table
        data={timeSheets}
        headers={['Description', 'Date', 'Hours', 'Task', 'Employee', 'Project']}
        dataValues={['description', 'date', 'hours']}
        modalFunction={deleteTimeSheet}
      />
    </div>
  );
};

export default TimeSheets;
