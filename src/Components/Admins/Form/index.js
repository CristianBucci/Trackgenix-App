import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../Shared/Modal/ModalConfirm';
import ModalMessage from '../../Shared/Modal/ModalMessage';
import Input from '../../Shared/Inputs';
import Buttons from '../../Shared/Button/index';

const Form = (props) => {
  const [admin, setAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const params = useParams();
  const id = params.Id && params.Id;

  const onSubmit = (e) => {
    e.preventDefault();
    setModalContent({
      title: 'Confirm',
      content: `Are you sure you want to ${
        id ? 'edit the admin with id ' + id : 'create a new admin'
      }?`
    });
    setShowModalConfirm(true);
  };

  const modalFunction = () => {
    id ? updateAdmin() : createAdmin();
  };

  const redirect = () => {
    props.history.push('/admins');
  };

  const adminForm = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);
      response = await response.json();
      setAdmin({
        name: response.data.name,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password
      });
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET Admin! ${error.message}` });
      setShowModalMessage(true);
    }
  };

  useEffect(async () => {
    if (id) {
      adminForm();
    }
  }, []);

  const createAdmin = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
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
          content: `Could not create new Admin! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not create new Admin! ${error.message}` });
      setShowModalMessage(true);
    }
  };

  const updateAdmin = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
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
          content: `Could not update Admin! ${response.message}`
        });
        setShowModalMessage(true);
      }
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not update Admin! ${error.message}` });
      setShowModalMessage(true);
    }
  };

  const onChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
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
      <div>
        <form onSubmit={onSubmit}>
          <Input
            label={'Name'}
            type="text"
            name="name"
            required
            value={admin.name}
            onChange={onChange}
            placeholder={'Name'}
          />
          <Input
            label={'Last Name'}
            type="text"
            name="lastName"
            required
            value={admin.lastName}
            onChange={onChange}
            placeholder={'Last Name'}
          />
          <Input
            label={'Email'}
            type="text"
            name="email"
            required
            value={admin.email}
            onChange={onChange}
            placeholder={'Email'}
          />
          <Input
            label={'Password'}
            type="password"
            name="password"
            required
            value={admin.password}
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
