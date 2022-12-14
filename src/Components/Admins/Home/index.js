import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import styles from './homeAdmin.module.css';
import Sidebar from 'Components/Admins/Sidebar';

const Projects = () => {
  const token = sessionStorage.getItem('token');

  console.log(token);
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const {
    list: projectsList,
    isLoading,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const modalWrapper = (id) => {
    const content = 'Are you sure you want to delete this Project?';
    setItemId(id);
    dispatch(confirmModalOpen(content));
  };

  const onConfirm = () => {
    dispatch(deleteProject(itemId));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS');
    dispatch(messageModalClose());
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const projectList = [];
  for (let i = 0; i < projectsList.length; i++) {
    const project = projectsList[i];
    if (project.employees.length == 0) {
      const newProject = {
        ...project,
        employees: 'No employees'
      };
      projectList.push(newProject);
    } else {
      let names = '';
      let employees = project.employees;
      employees.forEach((employee) => {
        if (employee.employeeId !== null) {
          names += `- ${employee.employeeId.name} ${employee.employeeId.lastName}\n`;
        } else {
          names += '- N/A\n';
        }
      });
      const newProject = {
        ...project,
        employees: names
      };
      projectList.push(newProject);
    }
  }

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
      <Sidebar />
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <>
            <div className={styles.title}>
              <h2>Manage Projects</h2>
            </div>
            <Table
              data={projectList}
              headers={[
                'Project Name',
                'Description',
                'Client Name',
                'Starting Date',
                'End Date',
                'Employees'
              ]}
              dataValues={[
                'name',
                'description',
                'clientName',
                'startDate',
                'endDate',
                'employees'
              ]}
              location={location}
              setShowModal={modalWrapper}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Projects;
