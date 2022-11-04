import React from 'react';
import styles from './ListItem.module.css';

const ListItem = ({ listItem, setShowModal, setDelId }) => {
  const formURL = `/super-admins/form?id=${listItem._id}`;

  const onClick = () => {
    window.location.assign(formURL);
  };
  const openModal = () => {
    setShowModal(true);
    setDelId(listItem._id);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.data}>
        {listItem.name} {listItem.lastName}
      </td>
      <td className={styles.data}>{listItem.email}</td>
      <td className={styles.actionButtons}>
        <button className={styles.editBtn} onClick={onClick}>
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={openModal}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
