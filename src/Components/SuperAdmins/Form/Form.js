import React from 'react';
import styles from './Form.module.css';

const Form = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Add new Super Admin</h2>
          <button>x</button>
        </div>
        <div>
          <form className={styles.form}>
            <label>First Name</label>
            <input type="text" name="name"></input>
            <label>Last Name</label>
            <input type="text" name="lastName"></input>
            <label>Email</label>
            <input type="text" name="email"></input>
            <label>Password</label>
            <input type="password" name="password"></input>
            <input type="submit" value="Confirm" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
