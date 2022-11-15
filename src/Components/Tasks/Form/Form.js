import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../../../redux/tasks/thunks';
import {
  confirmModalClose,
  createTasksPending,
  updateTasksPending,
  getTasksError
} from '../../../redux/tasks/actions';
import ModalConfirm from '../../Shared/Modal/ModalConfirm';
import ModalMessage from '../../Shared/Modal/ModalMessage';
import Input from '../../Shared/Inputs';
import styles from '../tasks.module.css';
import Buttons from '../../Shared/Button/index';

const TasksForm = (props) => {
  const [taskInput, setTaskInput] = useState('');
  const params = useParams();
  const id = params.id && params.id;
  const dispatch = useDispatch();
  const { modalContent, showModalConfirm, showModalMessage } = useSelector((state) => state.tasks);

  const onSubmit = (e) => {
    e.preventDefault();
    id ? dispatch(updateTasksPending(id)) : dispatch(createTasksPending());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    id ? dispatch(updateTask(taskInput, id)) : dispatch(createTask(taskInput));
    dispatch(confirmModalClose());
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
      dispatch(getTasksError(error.toString()));
    }
  }, []);

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
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
