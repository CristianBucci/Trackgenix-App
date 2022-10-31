import React from 'react';
import styles from './employees.module.css';

const List = ({ list, deleteEmployee }) => {
  return (
    <section>
      <div className={styles.tableTitle}>
        <h2>Employees</h2>
        <button>Create Employee</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>ID</th>
              <th className={styles.textLeft}>Name</th>
              <th className={styles.textLeft}>Phone</th>
              <th className={styles.textLeft}>Email</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {list.map((item) => {
              return (
                <tr key={item._id}>
                  <td className={styles.textLeft}>{item._id}</td>
                  <td className={styles.textLeft}>{item.name}</td>
                  <td className={styles.textLeft}>{item.phone}</td>
                  <td className={styles.textLeft}>{item.email}</td>
                  <td className={styles.textLeft}>
                    <button onClick={() => deleteEmployee(item._id)}>Delete</button>
                    <button onClick={() => deleteEmployee(item._id)}>Update</button>
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
