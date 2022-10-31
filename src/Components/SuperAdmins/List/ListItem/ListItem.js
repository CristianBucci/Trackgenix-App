import React from 'react';
import styles from './ListItem.module.css';

const ListItem = ({ listItem, deleteSuperAdmin }) => {
  const formURL = `/super-admins/form?id=${listItem._id}`;
  const deleteHandler = () => {
    deleteSuperAdmin(listItem._id);
  };

  const onClick = () => {
    window.location.assign(formURL);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.data}>
        {listItem.name} {listItem.lastName}
      </td>
      <td className={styles.data}>{listItem.email}</td>
      <td className={styles.actionButtons}>
        <button onClick={onClick}>o</button>
        <button onClick={() => deleteHandler()}>x</button>
      </td>
    </tr>
  );
};

export default ListItem;
