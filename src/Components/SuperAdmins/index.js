import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getSuperAdmins from '../../redux/super-admins/thunks';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './super-admins.module.css';

const SuperAdmins = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const {
    isPending,
    list: superAdminsList,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  const modalWrapper = (id) => {
    setItemId(id);
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'SuperAdmin',
    list: superAdminsList
  };

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={delParams}
        modalId={null}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>superadmins</h2>
        </div>
        {isPending ? (
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
