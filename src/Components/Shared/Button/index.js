import React from 'react';
import styles from './button.module.css';

const Buttons = ({ type, variant, name, onClick, disabled }) => {
  return (
    <button
      type={type ? type : 'button'}
      className={`${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Buttons;
