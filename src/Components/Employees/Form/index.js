import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  confirmModalOpen,
  messageModalOpen,
  confirmModalClose,
  messageModalClose
} from '../../../redux/super-admins/actions';
import { createEmployee, updateEmployee } from '../../../redux/employees/thunks';
import ModalConfirm from '../../Shared/Modal/ModalConfirm';
import ModalMessage from '../../Shared/Modal/ModalMessage';
import Input from '../../Shared/Inputs';
import Buttons from '../../Shared/Button/index';
import styles from './form.module.css';

function Form(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const { modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.superAdmins
  );
  const params = useParams();
  const id = params.id && params.id;
  const dispatch = useDispatch();

  useEffect(async () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const content = `Are you sure you want to ${
      id ? 'edit the employee with id ' + id : 'create a new employee'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') ? redirect() : null;
    dispatch(messageModalClose());
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
        <form onSubmit={onSubmit}>
          <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
          <Input
            label={'Name'}
            id="input-name"
            name="name"
            required
            type="text"
            value={formValues.name}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                name: e.target.value
              });
            }}
            placeholder={'Name'}
          />
          <Input
            label={'Last Name'}
            id="input-lastName"
            name="lastName"
            required
            type="text"
            value={formValues.lastName}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                lastName: e.target.value
              });
            }}
            placeholder={'Last Name'}
          />
          <Input
            label={'Email'}
            id="input-email"
            name="email"
            required
            type="text"
            value={formValues.email}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                email: e.target.value
              });
            }}
            placeholder={'Email'}
          />
          <Input
            label={'Password'}
            id="input-password"
            name="password"
            required
            type="password"
            value={formValues.password}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                password: e.target.value
              });
            }}
            placeholder={'Password'}
          />
          <Input
            label={'Phone'}
            id="input-phone"
            name="phone"
            required
            type="number"
            value={formValues.phone}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                phone: e.target.value
              });
            }}
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
