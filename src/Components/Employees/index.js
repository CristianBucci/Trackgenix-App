import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './employees.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';

const Employees = () => {
  const employeesList = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const modalWrapper = (id) => {
    setItemId(id);
    setModalContent({
      title: 'CONFIRM',
      content: `Are you sure you want to delete the employee with id ${id}?`
    });
    setShowModalConfirm(true);
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  let delParams = {
    id: itemId,
    path: 'employees',
    list: employeesList,
    setModalContent,
    setShowModalMessage
  };

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
