import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdTask, createTask, updateTask } from 'redux/tasks/thunks';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { taskSchema } from './validations';

const TasksForm = (props) => {
  const [taskInput, setTaskInput] = useState({
    description: ''
  });

  const dispatch = useDispatch();
  const {
    item: task,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.task);

  const params = useParams();
  const id = params.id && params.id;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(taskSchema)
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdTask(id));
    }
  }, []);

  useEffect(() => {
    if (task && id) {
      setValue('description', task.description);

      setTaskInput({
        description: task.description
      });
    }
  }, [task]);

  const onConfirm = () => {
    id ? dispatch(updateTask(taskInput, id)) : dispatch(createTask(taskInput));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/tasks');
  };

  const onSubmit = (event) => {
    console.log('entre');
    setTaskInput({
      description: event.description
    });
    const content = `Are you sure you want to ${
      id ? 'edit the task with id ' + id : 'create a new task'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const resetForm = () => {
    reset(taskInput);
  };

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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
          <p>Only BE or FE values are accepted</p>
          <Input
            register={register}
            label={'Task Type'}
            name="description"
            type="text"
            error={errors.description?.message}
            placeholder={'Task Type'}
          />
          <div>
            <Link to={'/tasks'}>
              <Buttons variant="secondary" name="Cancel" />
            </Link>
            <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
            <Buttons type="submit" variant="primary" name="Confirm" />
          </div>
        </form>
      </div>
    </>
  );
};

export default TasksForm;
