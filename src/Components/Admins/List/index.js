import React, { useState } from 'react';
import styles from './list.module.css';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../Shared/Modal/Modal.confirm';

const List = ({ list, deleteAdmin }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = (id) => {
    deleteAdmin(id);
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.table}>
        <table className={styles.td}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {list.map((admin) => {
              return (
                <tr key={admin._id}>
                  <td>{admin._id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.email}</td>
                  <td>
                    <ModalConfirm
                      show={showModal}
                      closeModal={setShowModal}
                      modalTitle={'Delete admin'}
                      modalContent={`Are you sure you want to delete admin whit ID ${admin._id}`}
                      modalFunction={confirmDelete}
                      modalId={admin._id}
                    />
                    <Link to={`/admins/${admin._id}`}>
                      <button>Update</button>
                    </Link>
                    <button onClick={() => setShowModal(true)}>Delete</button>
                  </td>
                </tr>
              );
            })}
            <Link to={'/admins/form'}>
              <button>Add</button>
            </Link>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default List;
