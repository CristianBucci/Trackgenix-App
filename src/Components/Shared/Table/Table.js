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
      <div>
        <Link to={'./super-admins/form'}>
          <button className={styles.createBtn}>Create new</button>
        </Link>
        <table className={styles.table}>
          <thead>
            <tr className={styles.row}>
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
                  <tr key={item._id}>
                    {props.headers.map((header, index) => {
                      return (
                        <>
                          <td key={index}>{item[header]}</td>
                        </>
                      );
                    })}
                    <td key={item._id}>
                      <button onClick={openModal}>DEL</button>
                      <Link to={`/super-admins/form?id=${item._id}`}>
                        <button>EDIT</button>
                      </Link>
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
