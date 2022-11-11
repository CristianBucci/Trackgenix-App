import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const params = useParams();
  const id = params.id && params.id;

  const onSubmit = (e) => {
    e.preventDefault();
    setModalContent({
      title: 'Confirm',
      content: `Are you sure you want to ${
        id ? 'edit the employee with id ' + id : 'create a new employee'
      }?`
    });
    setShowModalConfirm(true);
  };

  const modalFunction = () => {
    id ? updateEmployee() : createEmployee();
  };

  const redirect = () => {
    props.history.push('/employees');
  };

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
      setModalContent({ title: 'ERROR!', content: `Could not GET Employee! ${error.message}` });
      setShowModalMessage(true);
    }
  }, []);

  const createEmployee = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      if (response.status === 201) {
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not create new Employee! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not create new Employee! ${error.message}`
      });
      setShowModalMessage(true);
    }
  };

  const updateEmployee = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      if (response.status === 200) {
        response = await response.json();
        setModalContent({
          title: 'SUCCESS!',
          content: response.message
        });
        setShowModalMessage(true);
      } else {
        response = await response.json();
        setModalContent({
          title: 'ERROR!',
          content: `Could not update Employee! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not update Employee! ${error.message}` });
      setShowModalMessage(true);
    }
  };

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
        modalId={id}
      />
      <ModalMessage
        show={showModalMessage}
        closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={redirect}
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
