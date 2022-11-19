import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messageModalClose, confirmModalOpen, confirmModalClose } from 'redux/admins/actions';
import { createAdmins, updateAdmins, getByIdAdmin } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { Schema } from './validatons';
import { joiResolver } from '@hookform/resolvers/joi';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

const Form = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.Id ? params.Id : '';
  const [formText, setFormText] = useState('Add Admins');
  const [adminData, setAdminData] = useState('');

  const { admin, modalContent, showConfirmModal, showModalMessage } = useSelector(
    (state) => state.admins
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

  useEffect(async () => {
    if (id) {
      setFormText('Update Admins');
      dispatch(getByIdAdmin(id));
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    if (admin && id) {
      reset({
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password
      });
    }
  }, [admin]);

  const onConfirm = () => {
    id ? dispatch(updateAdmins(adminData, id)) : dispatch(createAdmins(adminData));
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

  const onSubmit = (data) => {
    const content = `Are you sure you want to ${
      id ? 'edit the Admins with id ' + id : 'create a new Admins'
    }?`;
    dispatch(confirmModalOpen(content));
    setAdminData(data);
  };

  const resetinputs = () => {
    id ? reset(admin) : reset();
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
            <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetinputs()} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
