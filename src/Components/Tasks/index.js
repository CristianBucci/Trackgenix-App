import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import styles from './tasks.module.css';
import { getTasks, deleteTasks } from 'redux/tasks/thunks';
import { confirmModalClose, messageModalClose, confirmModalOpen } from 'redux/tasks/actions';
import { Spinner } from 'Components/Shared/Spinner';

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
    const content = 'Are you sure you want to delete this Task?';
    setItemId(id);
    dispatch(confirmModalOpen(content));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    dispatch(deleteTasks(itemId));
    dispatch(confirmModalClose());
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS');
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
        modalFunction={modalFunction}
      />
      <section className={styles.container}>
        <h2 className={styles.title}>Tasks</h2>
        {isLoading ? (
          <Spinner />
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
