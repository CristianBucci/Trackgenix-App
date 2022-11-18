import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './tasks.module.css';
import { getTasks, deleteTasks } from '../../redux/tasks/thunks';
import {
  deleteTasksPending,
  confirmModalClose,
  messageModalClose
} from '../../redux/tasks/actions';

const Tasks = () => {
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    list: tasksList,
    isLoading,
    modalContent,
    showModalConfirm,
    showModalMessage
  } = useSelector((state) => state.tasks);

  const modalWrapper = (id) => {
    setItemId(id);
    dispatch(deleteTasksPending(id));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    dispatch(deleteTasks(itemId));
    dispatch(confirmModalClose());
  };

  const closeMessageModal = () => {
    dispatch(messageModalClose());
  };

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={closeMessageModal}
      />
      <section className={styles.container}>
        <h2 className={styles.title}>Tasks</h2>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <Table
            data={tasksList}
            headers={['ID', 'Description']}
            dataValues={['_id', 'description']}
            location={location}
            setShowModal={modalWrapper}
          />
        )}
      </section>
    </>
  );
};

export default Tasks;
