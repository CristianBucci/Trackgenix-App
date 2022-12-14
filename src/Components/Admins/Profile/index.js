import React from 'react';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import Sidebar from 'Components/Admins/Sidebar';
import styles from './profile.module.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/admins/actions';
import { getByIdAdmin, updateAdmins } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { adminSchema } from './validations';
import { logout } from 'redux/auth/thunks';

const AdminProfile = () => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const [formValues, setFormValues] = useState('');
  const dispatch = useDispatch();
  const { admin, modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.admins
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminSchema)
  });

  useEffect(() => {
    dispatch(getByIdAdmin(id, token));
  }, []);

  useEffect(() => {
    if (admin) {
      setValue('name', admin.name);
      setValue('lastName', admin.lastName);
      setValue('email', admin.email);
      setValue('password', admin.password);

      setFormValues({
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password
      });
    }
  }, [admin]);

  const onConfirm = () => {
    !modalContent.content.includes('logout')
      ? (dispatch(updateAdmins(id, formValues, token)), dispatch(confirmModalClose()))
      : dispatch(logout()),
      dispatch(confirmModalClose());
  };

  const onCancel = () => {
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

    const content = `Are you sure you want to edit your Profile?`;
    dispatch(confirmModalOpen(content));
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS');
    dispatch(messageModalClose());
  };

  const resetForm = () => {
    reset(formValues);
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
      <Sidebar />
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
          <div>
            <Buttons type="button" variant="primary" name="Change password" />
          </div>
          <div>
            <Buttons type="submit" variant="primary" name="Save changes" />
          </div>
          <div>
            <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
          </div>
          <div>
            <Buttons type="button" variant="primary" name="Delete account" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProfile;
