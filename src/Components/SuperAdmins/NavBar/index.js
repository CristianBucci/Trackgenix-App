import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'redux/auth/thunks';
import { confirmModalClose, confirmModalOpen } from 'redux/super-admins/actions';
import styles from './navbar.module.css';

const NavBar = () => {
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
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li>
            <Link to="/super-admins/">Admins</Link>
          </li>
          <li>
            <Link to="/super-admins/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={onSubmit}>Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
