import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import { useLocation } from 'react-router-dom';
import styles from './projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [itemId, setItemId] = useState('');
  const location = useLocation();

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      alert('Could not GET Projects.', error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const projectList = [];
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    if (project.employees.length == 0) {
      const newProject = {
        ...project,
        employees: 'N/A'
      };
      projectList.push(newProject);
    } else if (project.employees[0].employeeId == null) {
      const newProject = {
        ...project,
        employees: 'N/A'
      };
      projectList.push(newProject);
    } else {
      let names = [];
      let employees = project.employees;
      employees.map((employee) => {
        if (employee.employeeId !== null) {
          names.push(`${employee.employeeId.name} ${employee.employeeId.lastName}`);
        }
      });
      const nameList = names.join('-');
      const newProject = {
        ...project,
        employees: `${nameList}`
      };
      projectList.push(newProject);
    }
  }

  return (
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
        setShowModal={setShowModal}
        setItemId={setItemId}
      />
    </div>
  );
};

export default Projects;
