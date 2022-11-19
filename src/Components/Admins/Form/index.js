import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  messageModalOpen,
  messageModalClose,
  confirmModalOpen,
  confirmModalClose
} from 'redux/admins/actions';
import { createAdmins, updateAdmins } from 'redux/admins/thunks';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = (props) => {
  const dispatch = useDispatch();
  const { modalContent, showConfirmModal, showModalMessage } = useSelector((state) => state.admins);
  const params = useParams();
  const id = params.Id ? params.Id : '';
  const [formText, setFormText] = useState('Add Admins');

  useEffect(async () => {
    if (id) {
      reset({
        name: 'Cristian'
      });
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);
        const json = await response.json();
        setFormText('Update Admins');
        console.log(json);
      } catch (error) {
        dispatch(messageModalOpen({ title: 'Error', content: `Could not GET Admins ${error}` }));
      }
    } else {
      return null;
    }
  }, []);

  const Schema = Joi.object({
    name: Joi.string()
      .pattern(/^[\p{L}]+$/u)
      .min(3)
      .required(),
    lastName: Joi.string()
      .pattern(/^[\p{L}]+$/u)
      .min(3)
      .required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required()
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

  const onConfirm = () => {
    id ? dispatch(updateAdmins(id)) : dispatch(createAdmins());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/admins');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onSubmit = () => {
    const content = `Are you sure you want to ${
      id ? 'edit the Admins with id ' + id : 'create a new Admins'
    }?`;
    dispatch(confirmModalOpen(content));
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
          {<div className={styles.cardTitle}>{formText}</div>}
          <Input
            label={'Name'}
            type="text"
            name="name"
            placeholder={'Name'}
            register={register}
            error={errors.name?.message}
          />
          <Input
            label={'Last Name'}
            type="text"
            name="lastName"
            placeholder={'Last Name'}
            register={register}
            error={errors.lastName?.message}
          />
          <Input
            label={'Email'}
            type="text"
            name="email"
            placeholder={'Email'}
            register={register}
            error={errors.email?.message}
          />
          <Input
            label={'Password'}
            type="password"
            name="password"
            placeholder={'Password'}
            register={register}
            error={errors.password?.message}
          />
          <div>
            <Buttons type="submit" variant="primary" name="Confirm" />
            <Link to={'/admins'}>
              <Buttons variant="secondary" name="Cancel" />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
