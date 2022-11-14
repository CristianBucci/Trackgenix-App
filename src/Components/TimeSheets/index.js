import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets } from '../../redux/timesheets/thunks';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './timeSheets.module.css';

const TimeSheets = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const {
    isLoading,
    list: timeSheets,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.timesheets);
  const dispatch = useDispatch();

  const modalWrapper = (id) => {
    setItemId(id);
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'TimeSheets',
    list: timeSheets
  };

  useEffect(() => {
    dispatch(getTimeSheets());
  }, []);

  const timeSheetList = [];
  for (let i = 0; i < timeSheets.length; i++) {
    const timeSheet = timeSheets[i];
    if (timeSheet.task == null && timeSheet.employee == null && timeSheet.project == null) {
      const newTimeSheet = {
        ...timeSheet,
        task: 'N/A',
        employee: 'N/A',
        project: 'N/A'
      };
      timeSheetList.push(newTimeSheet);
    } else if (timeSheet.task == null && timeSheet.employee == null && timeSheet.project !== null) {
      const newTimeSheet = {
        ...timeSheet,
        task: 'N/A',
        employee: 'N/A',
        project: `${timeSheet.project['name']}`
      };
      timeSheetList.push(newTimeSheet);
    } else if (timeSheet.task == null && timeSheet.employee !== null && timeSheet.project == null) {
      const newTimeSheet = {
        ...timeSheet,
        task: 'N/A',
        employee: `${timeSheet.employee['name']} ${timeSheet.employee['lastName']}`,
        project: 'N/A'
      };
      timeSheetList.push(newTimeSheet);
    } else if (timeSheet.task !== null && timeSheet.employee == null && timeSheet.project == null) {
      const newTimeSheet = {
        ...timeSheet,
        task: `${timeSheet.task['description']}`,
        employee: 'N/A',
        project: 'N/A'
      };
      timeSheetList.push(newTimeSheet);
    } else if (
      timeSheet.task == null &&
      timeSheet.employee !== null &&
      timeSheet.project !== null
    ) {
      const newTimeSheet = {
        ...timeSheet,
        task: 'N/A',
        employee: `${timeSheet.employee['name']} ${timeSheet.employee['lastName']}`,
        project: `${timeSheet.project['name']}`
      };
      timeSheetList.push(newTimeSheet);
    } else if (
      timeSheet.task !== null &&
      timeSheet.employee == null &&
      timeSheet.project !== null
    ) {
      const newTimeSheet = {
        ...timeSheet,
        task: `${timeSheet.task['description']}`,
        employee: 'N/A',
        project: `${timeSheet.project['name']}`
      };
      timeSheetList.push(newTimeSheet);
    } else if (
      timeSheet.task !== null &&
      timeSheet.employee !== null &&
      timeSheet.project == null
    ) {
      const newTimeSheet = {
        ...timeSheet,
        task: `${timeSheet.task['description']}`,
        employee: `${timeSheet.employee['name']} ${timeSheet.employee['lastName']}`,
        project: 'N/A'
      };
      timeSheetList.push(newTimeSheet);
    } else {
      const newTimeSheet = {
        ...timeSheet,
        task: `${timeSheet.task['description']}`,
        employee: `${timeSheet.employee['name']} ${timeSheet.employee['lastName']}`,
        project: `${timeSheet.project['name']}`
      };
      timeSheetList.push(newTimeSheet);
    }
  }

  return (
    <>
      {' '}
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={delParams}
        modalId={null}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>timesheets</h2>
        </div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <Table
            data={timeSheetList}
            headers={['Description', 'Date', 'Hours', 'Task', 'Employee', 'Project']}
            dataValues={['description', 'date', 'hours', 'task', 'employee', 'project']}
            location={location}
            setShowModal={modalWrapper}
          />
        )}
      </div>
    </>
  );
};

export default TimeSheets;
