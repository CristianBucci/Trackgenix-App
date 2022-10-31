import React from 'react';
import styles from './ListItem.module.css';

const ListItem = ({ listItem, deleteSuperAdmin }) => {
  const deleteHandler = () => {
    deleteSuperAdmin(listItem._id);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.data}>
        {listItem.name} {listItem.lastName}
      </td>
      <td className={styles.data}>{listItem.email}</td>
      <td className={styles.actionButtons}>
        <button>o</button>
        <button onClick={() => deleteHandler()}>x</button>
      </td>
    </tr>
  );
};

export default ListItem;
