import React from 'react';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './profile.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import { getByIdEmployee, updateEmployee } from 'redux/employees/thunks';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';

const EmployeesProfile = (props) => {
  const [displayInput, setDisplayInput] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const dispatch = useDispatch();
  const {
    item: employee,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.employees);

  const id = '637b848509e8dffba1304058';

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeeSchema)
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdEmployee(id));
    }
  }, []);

  useEffect(() => {
    if (employee && id) {
      setValue('name', employee.name);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('password', employee.password);
      setValue('phone', employee.phone);

      setFormValues({
        name: employee.name,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        phone: employee.phone
      });
    }
  }, [employee]);

  const onConfirm = () => {
    dispatch(updateEmployee(id, formValues));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/employees/home');
  };

  const onSubmit = (event) => {
    setFormValues({
      name: event.name,
      lastName: event.lastName,
      email: event.email,
      password: event.password,
      phone: event.phone
    });

    const content = `Are you sure you want to ${
      id ? 'edit the employee with id ' + id : 'create a new employee'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const resetForm = () => {
    reset(formValues);
  };

  const displayPassword = () => {
    setDisplayInput(!displayInput);
  };

  return (
    <>
      <Sidebar />
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
          <h2>My profle</h2>
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
            label={'Phone'}
            name="phone"
            type="text"
            error={errors.phone?.message}
            placeholder={'Phone'}
          />
          {displayInput && (
            <Input
              className={styles.passwordInput}
              register={register}
              label={'Password'}
              name="password"
              type="password"
              disable
              error={errors.password?.message}
              placeholder={'Password'}
            />
          )}
          <div>
            <Buttons
              type="button"
              variant="primary"
              name="Change password"
              onClick={() => displayPassword()}
            />
          </div>
          <div>
            <Buttons type="submit" variant="primary" name="Save channges" />
          </div>
          <div>
            <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
          </div>
          <div>
            <Link to={'/home'}>
              <Buttons variant="secondary" name="Log Out" />
            </Link>
          </div>
          <div>
            <Buttons type="button" variant="primary" name="Delete account" />
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeesProfile;
