import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './tasks.module.css';
import { getTasks } from '../../redux/tasks/thunks';

const Tasks = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasks.list);

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
    setModalContent,
    setShowModalMessage
  };

  useEffect(() => {
    dispatch(getTasks());
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
