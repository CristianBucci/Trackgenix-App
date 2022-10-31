import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import ProjectTable from './List';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(projects);

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, { method: 'DELETE' });
    setProjects([...projects.filter((item) => item._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <ProjectTable list={projects} deleteItem={deleteItem} />
    </section>
  );
}

export default Projects;
