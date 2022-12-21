import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from 'redux/employees/thunks';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import styles from './employees.module.css';
import { Spinner } from 'Components/Shared/Spinner';

const Employees = (props) => {
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const {
    isLoading,
    list: employeesList,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const modalWrapper = (id) => {
    const content = 'Are you sure you want to delete this Employee?';
    setItemId(id);
    dispatch(confirmModalOpen(content));
  };

  const onConfirm = () => {
    dispatch(deleteEmployee(itemId));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const redirect = () => {
    props.history.push('/employees');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
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
          <h2>employees</h2>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            data={employeesList}
            headers={['First name', 'Last name', 'Phone', 'Email']}
            dataValues={['name', 'lastName', 'phone', 'email']}
            location={location}
            setShowModal={modalWrapper}
          />
        )}
      </div>
    </>
  );
};

export default Employees;
