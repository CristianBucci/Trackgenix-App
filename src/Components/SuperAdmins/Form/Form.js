import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './Form.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  confirmModalOpen,
  messageModalOpen,
  confirmModalClose,
  messageModalClose
} from 'redux/super-admins/actions';
import { createSuperAdmin, updateSuperAdmin } from 'redux/super-admins/thunks';

const Form = (props) => {
  const dispatch = useDispatch();

  const { modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.superAdmins
  );

  const params = useParams();
  const id = params.id ? params.id : '';
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [formText, setFormText] = useState('Add SuperAdmin');

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
        const json = await response.json();
        setFormText('Update SuperAdmin');
        setSuperAdminInput({
          name: json.data.name,
          lastName: json.data.lastName,
          email: json.data.email,
          password: json.data.password
        });
      } catch (error) {
        dispatch(
          messageModalOpen({ title: 'ERROR', content: `Could not GET superAdmin. ${error}` })
        );
      }
    } else {
      return null;
    }
  }, []);

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
    e.preventDefault();
    const content = `Are you sure you want to ${
      id ? 'edit the superAdmin with id ' + id : 'create a new superAdmin'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
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
        <form onSubmit={onSubmit} className={styles.form}>
          {<div className={styles.cardTitle}>{formText}</div>}
          <Input
            label={'First Name'}
            name="name"
            required
            type="text"
            value={superAdminInput.name}
            onChange={onChange}
            placeholder={'First Name'}
          />
          <Input
            label={'Last Name'}
            name="lastName"
            required
            type="text"
            value={superAdminInput.lastName}
            onChange={onChange}
            placeholder={'Last Name'}
          />
          <Input
            label={'Email'}
            name="email"
            required
            type="text"
            value={superAdminInput.email}
            onChange={onChange}
            placeholder={'Email'}
          />
          <Input
            label={'Password'}
            name="password"
            required
            type="password"
            value={superAdminInput.password}
            onChange={onChange}
            placeholder={'Password'}
          />
          <div className={styles.submit}>
            <Buttons type="submit" variant="primary" name="Confirm" />
            <Link to={'/super-admins'}>
              <Buttons variant="secondary" name="Cancel" />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
