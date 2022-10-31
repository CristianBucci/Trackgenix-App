import { useState, useEffect } from 'react';
import styles from './Form.module.css';

const Form = () => {
  const listURL = 'http://localhost:3000/super-admins';
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const currentSuperAdminInput = async () => {
    try {
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf('=') + 1);
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
      response = await response.json();

      setSuperAdminInput({
        name: response.data.name,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async () => {
    if (window.location.href.includes('id=')) {
      currentSuperAdminInput();
    }
  }, []);

  const handler = () => {
    if (window.location.href.includes('id=')) {
      editSuperAdmin(superAdminInput);
    } else {
      addSuperAdmin(superAdminInput);
    }
  };

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    window.location.assign(listURL);
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
        window.location.assign(listURL);
      } else {
        response = await response.json();
        alert(response.message);
      }
    } catch (error) {
      alert(error);
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
      console.log(response);
      if (response.status === 200) {
        response = await response.json();
        alert(response.message);
        window.location.assign(listURL);
      } else {
        response = await response.json();
        alert(response.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handler();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Super Admins</h2>
          <button onClick={onClick}>x</button>
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
          <input type="submit" value="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default Form;
