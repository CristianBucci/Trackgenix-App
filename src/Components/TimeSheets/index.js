import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import { useLocation } from 'react-router-dom';
import styles from './timeSheets.module.css';

const TimeSheets = () => {
  const [timeSheets, setTimesheet] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [timeSheetList, setTimeSheetList] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemId, setItemId] = useState('');
  const location = useLocation();

  const getList = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/`);
      response = await response.json();
      setTimesheet(response.data);
      setTimeSheetList(response.data);
    } catch (error) {
      alert('Could not GET TimeSheets.', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // eslint-disable-next-line no-unused-vars
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

  /* console.log({ timeSheets });
  for (let i = 0; i < timeSheets.length; i++) {
    const timeSheet = timeSheets[i];
    if (timeSheet.employee != null) {
      const newTimeSheet = {
        ...timeSheet,
        employee: `${timeSheets[i].employee['name']} ${timeSheet.employee['lastName']}`
      };
      console.log(newTimeSheet);
    } else {
      const newTimeSheet = {
        ...timeSheet,
        employee: 'N/A'
      };
      console.log(newTimeSheet);
    }
  } */
  /* timeSheetList.map((timeSheet, index) => {
    if (timeSheet.employee != null) {
      setTimeSheetList([
        ...timeSheetList.slice(0, index),
        {
          ...timeSheet,
          employee: `${timeSheet.employee['name']} ${timeSheet.employee['lastName']}`
        },
        ...timeSheetList.slice(index + 1)
      ]);
    } else {
      setTimeSheetList([
        ...timeSheetList.slice(0, index),
        {
          ...timeSheet,
          employee: 'N/A'
        },
        ...timeSheetList.slice(index + 1)
      ]);
    }
  });
  console.log({ timeSheetList }); */

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>timesheets</h2>
      </div>
      <Table
        data={timeSheets}
        headers={['Description', 'Date', 'Hours', 'Task', 'Employee', 'Project']}
        dataValues={['description', 'date', 'hours', 'task', 'employee', 'project']}
        location={location}
        setShowModal={setShowModal}
        setItemId={setItemId}
      />
    </div>
  );
};

export default TimeSheets;
