import { joiResolver } from '@hookform/resolvers/joi';
import Buttons from 'Components/Shared/Button';
import Input from 'Components/Shared/Inputs';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/auth/thunks';
import {
  confirmModalClose,
  confirmModalOpen,
  messageModalClose,
  passwordModalClose,
  passwordModalOpen
} from 'redux/super-admins/actions';
import { getByIdSuperAdmins, updateSuperAdmin } from 'redux/super-admins/thunks';
import { superAdminSchema } from './validations';
import styles from './profile.module.css';
import ModalPassword from 'Components/Shared/Modal/ModalPassword';

const SuperAdminProfile = () => {
  const id = sessionStorage.getItem('id');
  const token = sessionStorage.getItem('token');

  const {
    item: superAdmin,
    modalContent,
    showModalMessage,
    showConfirmModal,
    showPasswordModal
  } = useSelector((state) => state.superAdmins);
  const [formValues, setFormValues] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByIdSuperAdmins(id, token));
  }, []);

  useEffect(() => {
    if (superAdmin) {
      setValue('name', superAdmin.name);
      setValue('lastName', superAdmin.lastName);
      setValue('email', superAdmin.email);

      setFormValues({
        name: superAdmin.name,
        lastName: superAdmin.lastName,
        email: superAdmin.email
      });
    }
  }, [superAdmin]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(superAdminSchema)
  });

  const onConfirm = () => {
    !modalContent.content.includes('logout')
      ? (dispatch(updateSuperAdmin(formValues, id)), dispatch(confirmModalClose()))
      : dispatch(logout()),
      dispatch(confirmModalClose());
  };
  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS');
    dispatch(messageModalClose());
  };

  const onSubmit = (data) => {
    setFormValues({
      name: data.name,
      lastName: data.lastName,
      email: data.email
    });

    const content = 'Are you sure you want to edit your Profile?';
    dispatch(confirmModalOpen(content));
  };

  const closePasswordModal = () => {
    dispatch(passwordModalClose());
  };
  const openPasswordModal = () => {
    dispatch(passwordModalOpen());
  };

  const resetForm = () => {
    reset(formValues);
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
      <ModalPassword
        show={showPasswordModal}
        userData={superAdmin}
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
        </form>
      </div>
    </>
  );
};

export default SuperAdminProfile;
