import React from 'react';
import styles from '../Datepicker/datepicker.module.css';

const Datepicker = ({ type, label, name, value, onChange, disabled }) => {
  return (
    <div className={styles.datepickerWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      ></input>
    </div>
  );
};

export default Datepicker;
