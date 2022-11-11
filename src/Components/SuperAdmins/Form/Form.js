import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModalConfirm from '../../Shared/Modal/ModalConfirm';
import ModalMessage from '../../Shared/Modal/ModalMessage';
import Input from '../../Shared/Inputs';
import Buttons from '../../Shared/Button/index';
import styles from './Form.module.css';

const Form = (props) => {
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
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
        id ? 'edit the SuperAdmin with id ' + id : 'create a new SuperAdmin'
      }?`
    });
    setShowModalConfirm(true);
  };

  const modalFunction = () => {
    id ? updateSuperAdmin() : createSuperAdmin();
  };

  const redirect = () => {
    props.history.push('/super-admins');
  };

  const currentSuperAdminInput = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
      response = await response.json();

      setSuperAdminInput({
        name: response.data.name,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password
      });
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET SuperAdmin! ${error.message}` });
      setShowModalMessage(true);
    }
  };

  useEffect(async () => {
    if (id) {
      currentSuperAdminInput();
    }
  }, []);

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const createSuperAdmin = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdminInput)
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
          content: `Could not create new SuperAdmin! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not create new SuperAdmin! ${error.message}`
      });
      setShowModalMessage(true);
    }
  };

  const updateSuperAdmin = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdminInput)
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
          content: `Could not update SuperAdmin! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({
        title: 'ERROR!',
        content: `Could not update SuperAdmin! ${error.message}`
      });
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
        <div className={styles.header}>
          <div>
            <h2>Super Admins</h2>
          </div>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
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
