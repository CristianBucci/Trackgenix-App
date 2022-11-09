import React, { useState } from 'react';
import styles from '../tasks.module.css';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../Shared/Modal/Modal.confirm';

const ListItem = ({ taskList, deleteTask }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = (id) => {
    deleteTask(id);
    setShowModal(false);
  };

  return (
    <>
      <ModalConfirm
        show={showModal}
        closeModal={setShowModal}
        modalTitle={'Delete task'}
        modalContent={`Are you sure you want to delete task ${taskList.description} whit ID ${taskList._id}`}
        modalFunction={confirmDelete}
        modalId={taskList._id}
      />
      <tr className={styles.rows}>
        <td>{taskList._id}</td>
        <td>{taskList.description}</td>
        <td>
          <Link to={`tasks/${taskList._id}`}>
            <button>
              <img src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`} alt="Edit icon" />
            </button>
          </Link>
          <button onClick={() => setShowModal(true)}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`} alt="Delete icon" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ListItem;
