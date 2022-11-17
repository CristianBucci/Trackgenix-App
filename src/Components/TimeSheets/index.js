import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets, deleteTimeSheet } from '../../redux/timesheets/thunks';
import {
  confirmModalOpen,
  confirmModalClose,
  messageModalClose
} from '../../redux/timesheets/actions';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './timeSheets.module.css';

const TimeSheets = (props) => {
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const {
    isLoading,
    list: timeSheets,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.timesheets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const onConfirm = () => {
    dispatch(deleteTimeSheet(itemId));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/timesheets');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const modalWrapper = (id) => {
    const content = 'Are you sure you want to delete this TimeSheet?';
    setItemId(id);
    dispatch(confirmModalOpen(content));
  };

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
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
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
