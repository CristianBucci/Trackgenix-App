import React from 'react';
import styles from './sidebar.module.css';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';

import { Link } from 'react-router-dom';
import { logout } from 'redux/auth/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose } from 'redux/admins/actions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { modalContent, showConfirmModal } = useSelector((state) => state.auth);

  const onConfirm = () => {
    dispatch(logout());
    dispatch(confirmModalClose());
  };

  const onSubmit = () => {
    const content = `Are you sure you want to logout?`;
    dispatch(confirmModalOpen(content));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <aside className={styles.sidebar}>
        <ul>
          <li>
            <Link to="/employees/">Projects</Link>
          </li>
          <li>
            <Link to="/employees/timesheets">Timesheets</Link>
          </li>
          <li>
            <Link to="/employees/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={onSubmit}>Logout</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
