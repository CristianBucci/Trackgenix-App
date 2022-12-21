import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import styles from './projects.module.css';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/projects/actions';
import { Spinner } from 'Components/Shared/Spinner';

const Projects = () => {
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
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>projects</h2>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            data={projectList}
            headers={[
              'Project Name',
              'Desription',
              'Client Name',
              'Starting Date',
              'End Date',
              'Employees'
            ]}
            dataValues={['name', 'description', 'clientName', 'startDate', 'endDate', 'employees']}
            location={location}
            setShowModal={modalWrapper}
          />
        )}
      </div>
    </>
  );
};

export default Projects;
