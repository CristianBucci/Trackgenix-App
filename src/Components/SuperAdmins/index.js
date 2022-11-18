import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from 'redux/super-admins/thunks';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/super-admins/actions';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import styles from './super-admins.module.css';

const SuperAdmins = (props) => {
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const {
    isLoading,
    list: superAdminsList,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const onConfirm = () => {
    dispatch(deleteSuperAdmin(itemId));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/super-admins');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const modalWrapper = (id) => {
    const content = 'Are you sure you want to delete this SuperAdmin?';
    setItemId(id);
    dispatch(confirmModalOpen(content));
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
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>superadmins</h2>
        </div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <Table
            data={superAdminsList}
            headers={['First name', 'Last name', 'Email']}
            dataValues={['name', 'lastName', 'email']}
            location={location}
            setShowModal={modalWrapper}
          />
        )}
      </div>
    </>
  );
};

export default SuperAdmins;
