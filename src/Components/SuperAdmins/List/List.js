import React, { useState } from 'react';
import ListItem from './ListItem/ListItem';
import Modal from './Modal/Modal';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

const List = ({ superAdminsList, deleteSuperAdmin }) => {
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
              <Link to={'./super-admins/form'}>
                <button className={styles.createBtn}>Create new</button>
              </Link>
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
                setDelId={deleteSuperAdmin}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
