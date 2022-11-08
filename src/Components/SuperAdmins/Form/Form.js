import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../Shared/Inputs';
import styles from './Form.module.css';

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

  const onClick = () => {
    props.history.push('/super-admins');
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
          <button className={styles.closeBtn} onClick={onClick}>
            x
          </button>
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
          <input type="submit" value="Confirm" className={styles.confirmBtn} />
        </div>
      </form>
    </div>
  );
};

export default Form;
