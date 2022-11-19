import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from 'redux/tasks/thunks';
import {
  confirmModalClose,
  messageModalClose,
  createTasksPending,
  updateTasksPending,
  getTasksError
} from 'redux/tasks/actions';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import styles from '../tasks.module.css';
import Buttons from 'Components/Shared/Button/index';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const TasksForm = (props) => {
  const [taskInput, setTaskInput] = useState('');
  const params = useParams();
  const id = params.id && params.id;
  const dispatch = useDispatch();
  const { modalContent, showModalConfirm, showModalMessage } = useSelector((state) => state.tasks);

  const Schema = Joi.object({
    taskType: Joi.string().valid('BE', 'FE').required()
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

  const onSubmit = (e) => {
    e.preventDefault();
    id ? dispatch(updateTasksPending(id)) : dispatch(createTasksPending());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    id ? dispatch(updateTask(id)) : dispatch(createTask());
    dispatch(confirmModalClose());
  };

  const closeMessageModal = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const redirect = () => {
    props.history.push('/tasks');
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id ? id : ''}`);
      const json = await response.json();
      console.log(json);
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
        modalFunction={closeMessageModal}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label={'Task Type'}
              name="taskType"
              register={register}
              type="text"
              error={errors.name?.message}
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
