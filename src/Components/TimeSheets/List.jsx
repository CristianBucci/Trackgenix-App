import React from 'react';
import styles from './time-sheets.module.css';

const List = ({ list, deleteItem }) => {
  return (
    <section>
      <div className={styles.tableTitle}>
        <h2>TimeSheets</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>Description</th>
              <th className={styles.textLeft}>Date</th>
              <th className={styles.textLeft}>Hours</th>
              <th className={styles.textLeft}>Task</th>
              <th className={styles.textLeft}>Employee</th>
              <th className={styles.textLeft}>Project</th>
              <th className={styles.textLeft}></th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {list.map((item) => {
              return (
                <tr key={item._id}>
                  <td className={styles.textLeft}>{item.description}</td>
                  <td className={styles.textLeft}>{item.date}</td>
                  <td className={styles.textLeft}>{item.hours}</td>
                  <td className={styles.textLeft}>{item.task['description']}</td>
                  <td className={styles.textLeft}>
                    {item.employee['lastName']} {item.employee['name']}
                  </td>
                  <td className={styles.textLeft}>{item.project['description']}</td>
                  <td className={styles.textLeft}>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                    <button onClick={() => deleteItem(item._id)}>Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default List;
