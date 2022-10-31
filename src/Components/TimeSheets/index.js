import { useEffect, useState } from 'react';
// import TimeSheet from './TimeSheet/index';
import Modal from './Modal/index';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [timeSheet, saveList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState(undefined);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}timesheets/`);
      const json = await response.json();
      saveList(json.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteTimeSheet = async (id) => {
    saveList([...timeSheet.filter((timeSheet) => timeSheet._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}timesheets/${id}`, {
      method: 'DELETE'
    });
  };

  return (
    <section>
      <Modal
        show={showModal}
        closeModal={closeModal}
        deleteTimeSheet={deleteTimeSheet}
        timeSheetId={timeSheetId}
        title="Do you want to delete this TimeSheet?"
      />
      <div className={styles.list}>
        <div className={styles.tableTitle}>
          <h2>TimeSheets</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>Description</th>
              <th className={styles.textLeft}>Date</th>
              <th className={styles.textLeft}>Hours</th>
              <th className={styles.textLeft}>Task</th>
              <th className={styles.textLeft}>Employee</th>
              <th className={styles.textLeft}>Project</th>
              <th className={styles.textLeft}>
                <button
                  className={styles.add}
                  onClick={() => {
                    window.location.assign('/time-sheets/form');
                  }}
                >
                  <a>Add TimeSheet</a>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {timeSheet.map((timeSheet) => {
              return (
                <tr key={timeSheet._id}>
                  <td className={styles.textLeft}>{timeSheet.description}</td>
                  <td className={styles.textLeft}>{timeSheet.date}</td>
                  <td className={styles.textLeft}>{timeSheet.hours}</td>
                  <td className={styles.textLeft}>
                    {timeSheet.task === null ? 'Error' : timeSheet.task['description']}
                  </td>
                  <td className={styles.textLeft}>
                    {timeSheet.employee === null
                      ? 'Error'
                      : timeSheet.employee['lastName'] + timeSheet.employee['name']}
                  </td>
                  <td className={styles.textLeft}>
                    {timeSheet.project === null ? 'Error' : timeSheet.project['description']}
                  </td>
                  <td className={styles.textLeft}>
                    <button
                      className={styles.update}
                      onClick={() => {
                        window.location.assign(`/time-sheets/form?id=${timeSheet._id}`);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        setShowModal(true);
                        setTimeSheetId(timeSheet._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TimeSheets;
