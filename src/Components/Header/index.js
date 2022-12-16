import { useDispatch, useSelector } from 'react-redux';
import { confirmModalOpen, confirmModalClose } from 'redux/admins/actions';
import { logout } from 'redux/auth/thunks';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, modalContent, showConfirmModal } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(logout());
    dispatch(confirmModalClose());
  };

  const onSubmit = () => {
    const content = 'Are you sure you want to logout?';
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
      <header className={styles.header}>
        <Link className={styles.link} to="/home">
          <h2 className={styles.hover}>TRACKGENIX</h2>
        </Link>
        <div className={styles.buttonContainer}>
          {isAuthenticated ? (
            <button className={styles.headerButton} onClick={onSubmit}>
              LOG OUT
            </button>
          ) : (
            <>
              <Link className={styles.link} to="/auth/login">
                <button className={styles.headerButton}>LOGIN</button>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/auth/sign-up">
                <button className={styles.headerButton}>SIGN UP</button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
