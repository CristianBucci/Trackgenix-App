import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ModalConfirm, ModalMessage } from '../../Shared/Modal/Modal';
import Input from '../../Shared/Inputs';
import styles from '../tasks.module.css';
import Buttons from '../../Shared/Button/index';

const TasksForm = (props) => {
  const [taskInput, setTaskInput] = useState('');
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const params = useParams();
  const id = params.id && params.id;

  const onSubmit = (e) => {
    e.preventDefault();
    setModalContent({
      title: 'Confirm',
      content: `Are you sure you want to ${
        id ? 'edit the Task with id ' + id : 'create a new Task'
      }?`
    });
    setShowModalConfirm(true);
  };

  const modalFunction = () => {
    id ? updateTask() : createTask();
  };

  const redirect = () => {
    props.history.push('/tasks');
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id ? id : ''}`);
      const json = await response.json();
      setTaskInput(json.data.description);
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET Task! ${error.message}` });
      setShowModalMessage(true);
    }
  }, []);

  const createTask = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ description: taskInput }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 201) {
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not create new Task! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not create new Task! ${error.message}`
      });
      setShowModalMessage(true);
    }
  };

  const updateTask = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description: taskInput }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 200) {
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not update Task! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not update Task! ${error.message}`
      });
      setShowModalMessage(true);
    }
  };

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
        modalId={id}
      />
      <ModalMessage
        show={showModalMessage}
        closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={redirect}
      />
      <div className={styles.formContainer}>
        <span>
          <Link to={'/tasks'}>
            <button>
              <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
            </button>
          </Link>
        </span>
        {id ? (
          <p>
            Edit task {taskInput} whit id: {id}
          </p>
        ) : (
          <p>Create new task</p>
        )}
        <p>Only BE or FE values are accepted</p>
        <form onSubmit={onSubmit}>
          <div>
            <Input
              label={'Task Type'}
              name="taskType"
              required
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder={'Task Type'}
            />
          </div>
          <Buttons type="submit" variant="primary" name="Confirm" />
          <Link to={'/tasks'}>
            <Buttons variant="secondary" name="Cancel" />
          </Link>
        </form>
      </div>
    </>
  );
};

export default TasksForm;
