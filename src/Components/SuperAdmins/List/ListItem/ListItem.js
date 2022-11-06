import React from 'react';
import styles from './ListItem.module.css';
import { Link } from 'react-router-dom';

const ListItem = ({ listItem, setShowModal, setDelId }) => {
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
        <Link to={`/super-admins/${listItem._id}`}>
          <button className={styles.editBtn}>Edit</button>
        </Link>
        <button className={styles.deleteBtn} onClick={openModal}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
