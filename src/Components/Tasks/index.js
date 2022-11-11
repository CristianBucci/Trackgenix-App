import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalConfirm, ModalMessage } from '../Shared/Modal/Modal';
import Table from '../Shared/Table/Table';
import styles from './tasks.module.css';

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const modalWrapper = (id) => {
    setItemId(id);
    setModalContent({
      title: 'CONFIRM',
      content: `Are you sure you want to delete the Task with id ${id}?`
    });
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'Tasks',
    list: tasksList,
    setList: setTasksList,
    setModalContent,
    setShowModalMessage
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      setTasksList(data.data);
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET Tasks! ${error.message}` });
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
      <section className={styles.container}>
        <h2 className={styles.title}>Tasks</h2>
        <Table
          data={tasksList}
          headers={['ID', 'Description']}
          dataValues={['_id', 'description']}
          location={location}
          setShowModal={modalWrapper}
        />
      </section>
    </>
  );
};

export default Tasks;
