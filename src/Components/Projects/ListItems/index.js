import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './listItem.module.css';
import ModalConfirm from '../../Shared/Modal/Modal.confirm';

const ListItem = ({ listItem, deleteItem }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = (id) => {
    deleteItem(id);
    setShowModal(false);
  };
  const projectsEmployeesNames = listItem.employees
    .map((employee) => (employee.employeeId ? employee.employeeId : ''))
    .map((projectEmployee) => [projectEmployee.name, ' ', projectEmployee.lastName]);
  return (
    <>
      <ModalConfirm
        show={showModal}
        closeModal={setShowModal}
        modalTitle={'Delete task'}
        modalContent={`Are you sure you want to delete task ${listItem.description} whit ID ${listItem._id}`}
        modalFunction={confirmDelete}
        modalId={listItem._id}
      />
      <tr>
        <td>{listItem.name} </td>
        <td>{listItem.description} </td>
        <td>{listItem.clientName} </td>
        <td>{listItem.startDate} </td>
        <td>{listItem.endDate} </td>
        <td>{projectsEmployeesNames}</td>
        <td>
          <button onClick={() => setShowModal(true)}>Delete</button>
          <Link to={`/projects/${listItem._id}`}>
            {' '}
            <button>Edit</button>
          </Link>
        </td>
      </tr>
    </>
  );
};
export default ListItem;
