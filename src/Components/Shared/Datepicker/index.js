import React from 'react';
import styles from '../Inputs/input.module.css';

const Datepicker = ({ type, label, name, value, onChange, disabled }) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${disabled && styles.disabled} ${styles.input}`}
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
