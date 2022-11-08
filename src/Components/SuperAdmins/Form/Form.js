import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';
import Buttons from '../../Shared/Button/index';

const Form = (props) => {
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [err, setErr] = useState('');
  const params = useParams();
  const id = params.id ? params.id : '';

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
      setErr(error);
      alert(err);
    }
  };

  useEffect(async () => {
    if (id) {
      currentSuperAdminInput();
    }
  }, []);

  const addOrEditHandler = () => {
    if (id) {
      editSuperAdmin(superAdminInput);
    } else {
      addSuperAdmin(superAdminInput);
    }
  };

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const addSuperAdmin = async (input) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });
      if (response.status === 201) {
        response = await response.json();
        alert(response.message);
        props.history.push('/super-admins');
      } else {
        response = await response.json();
        alert(response.message);
      }
    } catch (error) {
      setErr(error);
      alert(err);
    }
  };

  const editSuperAdmin = async (input) => {
    try {
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf('=') + 1);
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });
      if (response.status === 200) {
        response = await response.json();
        alert(response.message);
        props.history.push('/super-admins');
      } else {
        response = await response.json();
        alert(response.message);
      }
    } catch (error) {
      setErr(error);
      alert(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await addOrEditHandler();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Super Admins</h2>
        </div>
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.input}>
          <label>First Name</label>
          <input type="text" name="name" value={superAdminInput.name} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label>Last Name</label>
          <input type="text" name="lastName" value={superAdminInput.lastName} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label>Email</label>
          <input type="text" name="email" value={superAdminInput.email} onChange={onChange} />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={superAdminInput.password}
            onChange={onChange}
          />
        </div>
        <div className={styles.submit}>
          <Buttons type="submit" variant="confirm" name="Confirm" />
          <Link to={'/super-admins'}>
            <Buttons variant="cancel" name="Cancel" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
