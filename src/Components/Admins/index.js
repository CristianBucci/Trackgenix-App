import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './admins.module.css';

const Admins = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const {
    isLoading,
    list: adminsList,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  //Commented so it doesn't break until the delete is done
  const modalWrapper = (id) => {
    setItemId(id);
    // setModalContent({
    //   title: 'CONFIRM',
    //   content: `Are you sure you want to delete the admin with id ${id}?`
    // });
    setShowModalConfirm(true);
  };

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  let delParams = {
    id: itemId,
    path: 'Admin',
    setList: adminsList
  };

  useEffect(() => {
    dispatch(getAdmins());
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
