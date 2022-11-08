import React from 'react';
import styles from './button.module.css';

const Buttons = ({ type, variant, name, onClick }) => {
  return (
    <button type={type ? type : 'button'} className={`${styles[variant]}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default Buttons;
