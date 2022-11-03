import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import ProjectList from './List';
import Modal from './Modals/modal.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      setProjects('Cannot get projects', { error });
      alert(projects);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
      });
      setProjects([...projects.filter((item) => item._id !== id)]);
      const data = await response.json();
      setContentMessage(data.message);
      setProjects(projects.filter((projects) => projects._id !== id));
      setModalTitle('Success');
      setModalDisplay(true);
    } catch (error) {
      setModalTitle('Error', { error });
    }
  };
  return (
    <>
      <section className={styles.container}>
        <ProjectList list={projects} deleteItem={deleteItem} />
      </section>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
};

export default Projects;
