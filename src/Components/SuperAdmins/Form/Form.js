import { useState, useEffect } from 'react';
import styles from './Form.module.css';

const Form = () => {
  const [setSuperAdminsList] = useState([]);
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const getList = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`);
      response = await response.json();
      setSuperAdminsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSuperAdmin = async () => {
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
      getSuperAdmin();
    } else {
      return null;
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
    window.location.assign('http://localhost:3000/super-admins');
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
      response = await response.json();
      getList();
      alert(response.message);
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
      response = await response.json();
      getList();
      alert(response.message);
    } catch (error) {
      alert(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handler();
    window.location.assign('http://localhost:3000/super-admins');
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Super Admins</h2>
          <button onClick={onClick}>x</button>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div>
            <label>First Name</label>
            <input type="text" name="name" value={superAdminInput.name} onChange={onChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={superAdminInput.lastName}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email" value={superAdminInput.email} onChange={onChange} />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={superAdminInput.password}
              onChange={onChange}
            />
          </div>
          <div>
            <input type="submit" value="Confirm" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
