import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  // confirmModalOpen,
  confirmModalClose,
  messageModalOpen,
  messageModalClose
} from 'redux/employees/actions';
import { createEmployee, updateEmployee } from 'redux/employees/thunks';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';

function Form(props) {
  const dispatch = useDispatch();
  const { modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.employees
  );
  const params = useParams();
  const id = params.id && params.id;
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id ? id : ''}`);
        const data = await response.json();
        setFormValues({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password,
          phone: data.data.phone
        });
      } catch (error) {
        dispatch(messageModalOpen({ title: 'ERROR', content: `Could not GET employee. ${error}` }));
      }
    } else {
      return null;
    }
  }, []);

  const onConfirm = () => {
    id ? dispatch(updateEmployee(formValues, id)) : dispatch(createEmployee(formValues));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/employees');
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const content = `Are you sure you want to ${
  //     id ? 'edit the employee with id ' + id : 'create a new employee'
  //   }?`;
  //   dispatch(confirmModalOpen(content));
  // };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  console.log(employeeSchema);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeeSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
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
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
          <Input
            register={register}
            label={'Name'}
            name="name"
            type="text"
            error={errors.name?.message}
            placeholder={'Name'}
          />
          <Input
            register={register}
            label={'Last Name'}
            name="lastName"
            type="text"
            error={errors.lastName?.message}
            placeholder={'Last Name'}
          />
          <Input
            register={register}
            label={'Email'}
            name="email"
            type="text"
            error={errors.email?.message}
            placeholder={'Email'}
          />
          <Input
            register={register}
            label={'Password'}
            name="password"
            type="password"
            error={errors.password?.message}
            placeholder={'Password'}
          />
          <Input
            register={register}
            label={'Phone'}
            name="phone"
            type="text"
            error={errors.phone?.message}
            placeholder={'Phone'}
          />
          <div>
            <Buttons type="submit" variant="primary" name="Confirm" />
            <Link to={'/employees'}>
              <Buttons variant="secondary" name="Cancel" />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
