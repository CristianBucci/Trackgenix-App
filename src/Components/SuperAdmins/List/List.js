import React from 'react';
import ListItem from './ListItem/ListItem';
import styles from './List.module.css';

const List = ({ superAdminsList, deleteSuperAdmin }) => {
  const formURL = './super-admins/form';
  const onClick = () => {
    window.location.assign(formURL);
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.data}>Name</th>
            <th className={styles.data}>Email</th>
            <th className={styles.actionButtons}>
              <button className={styles.createBtn} onClick={onClick}>
                Create new
              </button>
            </th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {superAdminsList.map((superAdmin) => {
            return (
              <ListItem
                key={superAdmin._id}
                listItem={superAdmin}
                deleteSuperAdmin={deleteSuperAdmin}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
