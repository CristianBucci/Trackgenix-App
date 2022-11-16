import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  messageModalOpen,
  messageModalClose,
  confirmModalOpen,
  confirmModalClose
} from '../../../redux/admins/actions';
import { createAdmins, updateAdmins } from '../../../redux/admins/thunks';
import ModalConfirm from '../../Shared/Modal/ModalConfirm';
import ModalMessage from '../../Shared/Modal/ModalMessage';
import Input from '../../Shared/Inputs';
import Buttons from '../../Shared/Button/index';
import styles from './form.module.css';

const Form = (props) => {
  const dispatch = useDispatch();
  const { modalContent, showConfirmModal, showModalMessage } = useSelector((state) => state.admins);
  const params = useParams();
  const id = params.Id ? params.Id : '';
  const [adminsInput, setAdminsInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [formText, setFormText] = useState('Add Admins');

  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);
        const json = await response.json();
        setFormText('Update Admins');
        setAdminsInput({
          name: json.data.name,
          lastName: json.data.lastName,
          email: json.data.email,
          password: json.data.password
        });
      } catch (error) {
        dispatch(messageModalOpen({ title: 'Error', content: `Could not GET Admins ${error}` }));
      }
    } else {
      return null;
    }
  }, []);

  const onConfirm = () => {
    id ? dispatch(updateAdmins(adminsInput, id)) : dispatch(createAdmins(adminsInput));
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/admins');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') ? redirect() : null;
    dispatch(messageModalClose());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const content = `Are you sure you want to ${
      id ? 'edit the Admins with id ' + id : 'create a new Admins'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const onChange = (e) => {
    setAdminsInput({ ...adminsInput, [e.target.name]: e.target.value });
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
        <form onSubmit={onSubmit}>
          {<div className={styles.cardTitle}>{formText}</div>}
          <Input
            label={'Name'}
            type="text"
            name="name"
            required
            value={adminsInput.name}
            onChange={onChange}
            placeholder={'Name'}
          />
          <Input
            label={'Last Name'}
            type="text"
            name="lastName"
            required
            value={adminsInput.lastName}
            onChange={onChange}
            placeholder={'Last Name'}
          />
          <Input
            label={'Email'}
            type="text"
            name="email"
            required
            value={adminsInput.email}
            onChange={onChange}
            placeholder={'Email'}
          />
          <Input
            label={'Password'}
            type="password"
            name="password"
            required
            value={adminsInput.password}
            onChange={onChange}
            placeholder={'Password'}
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
