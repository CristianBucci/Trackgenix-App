import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from '../../redux/employees/thunks';
import {
  confirmModalOpen,
  confirmModalClose,
  messageModalClose
} from '../../redux/employees/actions';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './employees.module.css';

const Employees = (props) => {
  const {
    isLoading,
    list: employeesList,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const [itemId, setItemId] = useState(null);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const location = useLocation();

  const modalWrapper = (id) => {
    setItemId(id);
    const content = 'Are you sure you want to delete this Employee?';
    setShowModalConfirm(true);
    dispatch(confirmModalOpen(content));
  };

  const onConfirm = () => {
    dispatch(deleteEmployee(itemId));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const removeEmployee = (id) => {
    dispatch(deleteEmployee(id));
    modalWrapper(id);
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const redirect = () => {
    props.history.push('/employees');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') ? redirect() : null;
    dispatch(messageModalClose());
  };

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
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
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <Table
            data={employeesList}
            headers={['First name', 'Last name', 'Phone', 'Email']}
            dataValues={['name', 'lastName', 'phone', 'email']}
            location={location}
            deleteItem={removeEmployee}
            setShowModal={modalWrapper}
          />
        )}
      </div>
    </>
  );
};

export default Employees;
