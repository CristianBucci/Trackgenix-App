import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>{props.modalTitle}</div>
        <div className={styles.body}>
          <div className={styles.text}>{props.modalContent}</div>
        </div>
        <div className={styles.buttons}>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
