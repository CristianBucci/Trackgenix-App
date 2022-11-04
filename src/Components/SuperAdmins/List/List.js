import React, { useState } from 'react';
import ListItem from './ListItem/ListItem';
import Modal from './Modal/Modal';
import styles from './List.module.css';

const List = ({ superAdminsList, deleteSuperAdmin }) => {
  const formURL = './super-admins/form';
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState('');
  const closeModal = () => {
    setShowModal(false);
  };
  const deleteHandler = async () => {
    deleteSuperAdmin(delId);
    setShowModal(false);
    setDelId('');
  };
  const onClick = () => {
    window.location.assign(formURL);
  };

  return (
    <div>
      <Modal
        show={showModal}
        closeModal={closeModal}
        deleteHandler={deleteHandler}
        setDelId={setDelId}
      />
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
                setShowModal={setShowModal}
                setDelId={setDelId}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
