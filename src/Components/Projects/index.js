import { useEffect, useState } from 'react';
import Table from '../Shared/Table/Table';
import styles from './projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

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

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('Project removed.');
        setProjects([...projects.filter((project) => project._id !== id)]);
      } else {
        alert('Project could not be removed.');
      }
    } catch (error) {
      alert('Project could not be removed.', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>projects</h2>
      </div>
      <Table
        data={projects}
        headers={[
          'Project Name',
          'Desription',
          'Client Name',
          'Starting Date',
          'End Date',
          'Employees'
        ]}
        dataValues={['name', 'description', 'clientName', 'startDate', 'endDate', 'employees']}
        modalFunction={deleteProject}
      />
    </div>
  );
};

export default Projects;
