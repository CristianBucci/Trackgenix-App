import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import getProjects from '../../redux/projects/thunks';
import styles from './projects.module.css';

const Projects = () => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  //const [showModalMessage, setShowModalMessage] = useState(false);
  //const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const [itemId, setItemId] = useState(null);
  const location = useLocation();
  const {
    list: projectsList,
    isPending,
    modalContent,
    showModalMessage
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const modalWrapper = (id) => {
    setItemId(id);
    // setModalContent({
    //   title: 'CONFIRM',
    //   content: `Are you sure you want to delete the project with id ${id}?`
    // });
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'projects',
    list: projectsList
    //setList: setProjects
    // setModalContent,
    // setShowModalMessage
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

  if (isPending) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>projects</h2>
          <img src="/assets/images/spinner.gif" alt="spinner" className={styles.img} />
        </div>
      </div>
    );
  }

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
        //closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>projects</h2>
        </div>
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
      </div>
    </>
  );
};

export default Projects;
