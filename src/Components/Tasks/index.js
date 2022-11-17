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
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    list: tasksList,
    isLoading,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.tasks);

  const modalWrapper = (id) => {
    setItemId(id);
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'Tasks',
    list: tasksList
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
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
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
