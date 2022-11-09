import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './list.module.css';
import ModalConfirm from '../../Shared/Modal/Modal.confirm';

const List = ({ employees, deleteEmployee }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = (id) => {
    deleteEmployee(id);
    setShowModal(false);
  };

  return (
    <section>
      <div className={style.title}>
        <h2>Employees</h2>
        <Link to={'/employees/form'}>
          <button className={style.buttonCreate}>Create Employee</button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>
                    <ModalConfirm
                      show={showModal}
                      closeModal={setShowModal}
                      modalTitle={'Delete employee'}
                      modalContent={`Are you sure you want to delete employee whit ID ${employee.name}`}
                      modalFunction={confirmDelete}
                      modalId={employee._id}
                    />
                    <Link to={`/employees/${employee._id}`}>
                      <button className={style.btnIcons}>
                        <img src="/assets/images/pencil.png" alt="update" />
                      </button>
                    </Link>
                    <button className={style.btnIcons} onClick={() => setShowModal(true)}>
                      <img src="/assets/images/trash.png" alt="delete" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default List;
