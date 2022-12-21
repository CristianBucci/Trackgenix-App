import React from 'react';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './profile.module.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  confirmModalOpen,
  confirmModalClose,
  messageModalClose,
  passwordModalOpen,
  passwordModalClose
} from 'redux/employees/actions';
import { getByIdEmployee, updateEmployee, deleteEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';
import { logout } from 'redux/auth/thunks';
import ModalPassword from 'Components/Shared/Modal/ModalPassword';

const EmployeesProfile = () => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const [formValues, setFormValues] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const {
    item: employee,
    modalContent,
    showModalMessage,
    showConfirmModal,
    showPasswordModal
  } = useSelector((state) => state.employees);

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
    dispatch(getByIdEmployee(id, token));
  }, []);

  useEffect(() => {
    if (employee) {
      setValue('name', employee.name);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('phone', employee.phone);

      setFormValues({
        name: employee.name,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone
      });
    }
  }, [employee]);

  const onConfirm = () => {
    if (isDelete === false) {
      !modalContent.content.includes('logout')
        ? (dispatch(updateEmployee(id, formValues, token)), dispatch(confirmModalClose()))
        : dispatch(logout()),
        dispatch(confirmModalClose());
    } else {
      dispatch(deleteEmployee(id, token));
      dispatch(confirmModalClose());
    }
  };

  const closeConfirmModal = () => {
    isDelete && setIsDelete(false);
    dispatch(confirmModalClose());
  };

  const onSubmit = (data) => {
    setFormValues({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const content = 'Are you sure you want to edit your Profile?';
    dispatch(confirmModalOpen(content));
  };

  const closeMessageModal = () => {
    modalContent.title.includes('SUCCESS');
    isDelete && dispatch(logout());
    dispatch(messageModalClose());
  };
  const openPasswordModal = () => {
    dispatch(passwordModalOpen());
  };
  const closePasswordModal = () => {
    dispatch(passwordModalClose());
  };

  const resetForm = () => {
    reset(formValues);
  };

  const deleteAccount = () => {
    setIsDelete(true);
    const content = 'Are you sure you want to delete your Account?';
    dispatch(confirmModalOpen(content));
  };

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={closeConfirmModal}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={closeMessageModal}
      />
      <ModalPassword
        show={showPasswordModal}
        userData={employee}
        onCancel={closePasswordModal}
        setData={setFormValues}
      />
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>My profile</h2>
          <img
            src="https://img.freepik.com/vector-premium/avatar-elegante-hombre-negocios_24877-18075.jpg"
            alt="profile picture"
          ></img>
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
          <div>
            <Buttons
              type="button"
              variant="primary"
              name="Change password"
              onClick={openPasswordModal}
            />
          </div>
          <div>
            <Buttons type="submit" variant="primary" name="Save changes" />
          </div>
          <div>
            <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
          </div>
          <div>
            <Buttons
              type="button"
              variant="primary"
              name="Delete account"
              onClick={() => deleteAccount()}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeesProfile;
