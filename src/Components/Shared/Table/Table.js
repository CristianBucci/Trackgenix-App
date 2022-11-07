import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './Table.module.css';
import { Link } from 'react-router-dom';

const Table = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState('');
  const closeModal = () => {
    setShowModal(false);
  };
  const modalTitle = 'Delete item.';
  const modalContent = 'Are you sure to delete this Super Admin?';

  const deleteHandler = async () => {
    props.modalFunction(itemId);
    setShowModal(false);
    setItemId('');
  };

  return (
    <>
      <Modal
        show={showModal}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalContent={modalContent}
        modalFunction={deleteHandler}
      />
      <div className={styles.container}>
        <Link to={'./super-admins/form'} className={styles.createBtn}>
          <button>Create new</button>
        </Link>
        <table className={styles.table}>
          <thead className={styles.header}>
            <tr>
              {props.headers.map((header, index) => {
                return <th key={index}>{header}</th>;
              })}
              <th key={props.headers.length - 1}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {props.data.map((item) => {
              const openModal = () => {
                setShowModal(true);
                setItemId(item._id);
              };
              return (
                <>
                  <tr key={item._id} className={styles.row}>
                    {props.dataValues.map((value, index) => {
                      return (
                        <>
                          <td key={index}>{item[value]}</td>
                        </>
                      );
                    })}
                    <td key={item._id} className={styles.btnContainer}>
                      <Link to={`/super-admins/form?id=${item._id}`}>
                        <button className={styles.button}>
                          <img src="/assets/images/edit.svg" alt="update" />
                        </button>
                      </Link>
                      <button onClick={openModal} className={styles.button}>
                        <img src="/assets/images/trash.svg" alt="delete" />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
