import React, { useState } from 'react';
import styles from './ListItem.module.css';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../../Shared/Modal/Modal.confirm';

const ListItem = ({ listItem, setDelId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalConfirm
        show={showModal}
        closeModal={setShowModal}
        modalTitle={'Delete super admin'}
        modalContent={`Are you sure you want to delete Super Admin whit ID ${listItem._id}`}
        modalFunction={setDelId}
        modalId={listItem._id}
      />
      <tr className={styles.row}>
        <td className={styles.data}>
          {listItem.name} {listItem.lastName}
        </td>
        <td className={styles.data}>{listItem.email}</td>
        <td className={styles.actionButtons}>
          <Link to={`/super-admins/${listItem._id}`}>
            <button className={styles.editBtn}>Edit</button>
          </Link>
          <button className={styles.deleteBtn} onClick={() => setShowModal(true)}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ListItem;
