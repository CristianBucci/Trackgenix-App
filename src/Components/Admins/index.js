import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins, deleteAdmins } from '../../redux/admins/thunks';
import { messageModalClose, confirmModalOpen, confirmModalClose } from '../../redux/admins/actions';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './admins.module.css';

const Admins = (props) => {
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const {
    isLoading,
    list: adminsList,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const onConfirm = () => {
    dispatch(deleteAdmins(itemId));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/admins');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') ? redirect() : null;
    dispatch(messageModalClose());
  };

  const modalWrapper = (id) => {
    const content = 'Are you sure you want to delete this Admins?';
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
          <h2>admins</h2>
        </div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <Table
            data={adminsList}
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

export default Admins;
