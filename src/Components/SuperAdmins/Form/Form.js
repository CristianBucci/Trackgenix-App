import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './Form.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/super-admins/actions';
import { createSuperAdmin, updateSuperAdmin, getByIdSuperAdmins } from 'redux/super-admins/thunks';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { superAdminsValidationSchema } from './validations';

const Form = (props) => {
  const dispatch = useDispatch();

  const {
    modalContent,
    showModalMessage,
    showConfirmModal,
    item: superAdmin
  } = useSelector((state) => state.superAdmins);

  const params = useParams();
  const id = params.id ? params.id : '';

  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange', resolver: joiResolver(superAdminsValidationSchema) });

  useEffect(() => {
    if (id) {
      dispatch(getByIdSuperAdmins(id));
    }
  }, []);

  useEffect(() => {
    if (superAdmin && id) {
      setValue('name', superAdmin.name);
      setValue('lastName', superAdmin.lastName);
      setValue('email', superAdmin.email);
      setValue('password', superAdmin.password);

      setSuperAdminInput({
        name: superAdmin.name,
        lastName: superAdmin.lastName,
        email: superAdmin.email,
        password: superAdmin.password
      });
    }
  }, [superAdmin]);

  const onConfirm = () => {
    id
      ? dispatch(updateSuperAdmin(superAdminInput, id))
      : dispatch(createSuperAdmin(superAdminInput));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/super-admins');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onSubmit = (e) => {
    setSuperAdminInput({
      name: e.name,
      lastName: e.lastName,
      email: e.email,
      password: e.password
    });
    const content = `Are you sure you want to ${
      id ? 'edit the superAdmin with id ' + id : 'create a new superAdmin'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const resetForm = () => {
    reset(superAdminInput);
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
        <div className={styles.header}>
          <div>
            <h2>Super Admins</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {
            <div className={styles.cardTitle}>
              {id ? 'Update Super Admin' : 'Add new Super Admin'}
            </div>
          }
          <Input
            register={register}
            label={'First Name'}
            name="name"
            type="text"
            error={errors.name?.message}
            placeholder={'First Name'}
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
          <div className={styles.submit}>
            <Link to={'/super-admins'}>
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

export default Form;
