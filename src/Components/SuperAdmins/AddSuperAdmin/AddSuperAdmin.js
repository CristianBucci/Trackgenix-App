import React, { useState } from 'react';
import styles from './AddSuperAdmin.module.css';

const AddSuperAdmin = ({ addSuperAdmin }) => {
  const [superAdminInput, setSuperAdminInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const addHandler = () => {
    addSuperAdmin(superAdminInput);
  };

  const onChange = (e) => {
    setSuperAdminInput({ ...superAdminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addHandler();
    setSuperAdminInput({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div>
          <label>First Name</label>
          <input type="text" name="name" value={superAdminInput.name} onChange={onChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={superAdminInput.lastName} onChange={onChange} />
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
          <input type="submit" value="+" />
        </div>
      </form>
    </div>
  );
};

export default AddSuperAdmin;
