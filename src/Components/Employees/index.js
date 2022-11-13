import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import { closeMessageModal } from '../../redux/employees/actions';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './employees.module.css';

const Employees = () => {
  const {
    isPending,
    list: employeesList,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  //Commented so it doesn't break until the delete is done
  const modalWrapper = (id) => {
    setItemId(id);
    // setModalContent({
    //   title: 'CONFIRM',
    //   content: `Are you sure you want to delete the employee with id ${id}?`
    // });
    setShowModalConfirm(true);
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  let delParams = {
    id: itemId,
    path: 'employees',
    list: employeesList
  };

  const onClick = () => dispatch(closeMessageModal());

  return isPending ? (
    <div className={styles.spinnerContainer}>
      <img src="/assets/images/spinner.gif" alt="spinner" />
    </div>
  ) : (
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
        closeModal={onClick}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>employees</h2>
        </div>
        <Table
          data={employeesList}
          headers={['First name', 'Last name', 'Phone', 'Email']}
          dataValues={['name', 'lastName', 'phone', 'email']}
          location={location}
          setShowModal={modalWrapper}
        />
      </div>
    </>
  );
};

export default Employees;
