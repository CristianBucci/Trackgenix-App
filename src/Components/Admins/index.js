import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalConfirm, ModalMessage } from '../Shared/Modal/Modal';
import Table from '../Shared/Table/Table';
import styles from './admins.module.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const modalWrapper = (id) => {
    setItemId(id);
    setModalContent({
      title: 'CONFIRM',
      content: `Are you sure you want to delete the admin with id ${id}?`
    });
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'Admin',
    list: admins,
    setList: setAdmins,
    setModalContent,
    setShowModalMessage
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET admins! ${error.message}` });
      setShowModalMessage(true);
    }
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
        closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>admins</h2>
        </div>
        <Table
          data={admins}
          headers={['First name', 'Last name', 'Email']}
          dataValues={['name', 'lastName', 'email']}
          location={location}
          setShowModal={modalWrapper}
        />
      </div>
    </>
  );
};

export default Admins;
