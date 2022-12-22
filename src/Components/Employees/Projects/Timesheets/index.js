import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheetsByProject } from 'redux/timesheets/thunks';
import { messageModalClose } from 'redux/timesheets/actions';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import styles from './timeSheets.module.css';
import { Spinner } from 'Components/Shared/Spinner';

const TimeSheets = () => {
  const location = useLocation();
  const {
    isLoading,
    list: timeSheets,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.timesheets);
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('token');

  const params = useParams();
  const project = params.id && params.id;

  useEffect(() => {
    dispatch(getTimesheetsByProject(token, project));
  }, []);

  const modalFunction = () => {
    dispatch(messageModalClose());
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
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div className={styles.container}>
        <div className={styles.title}></div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            {timeSheetList.length && (
              <div className={styles.title}>
                <h2>Timesheets: {timeSheetList[0].project}</h2>
              </div>
            )}
            <Table
              data={timeSheetList}
              headers={['Description', 'Date', 'Hours', 'Task', 'Employee']}
              dataValues={['description', 'date', 'hours', 'task', 'employee']}
              location={location}
              displayCreateButton={false}
              displayActions={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TimeSheets;
