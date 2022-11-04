import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>Delete Super Admin</div>
        <div className={styles.body}>
          <div className={styles.text}> Are you sure to delete this Super Admin? </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.yBtn} onClick={props.deleteHandler}>
            Yes
          </button>
          <button className={styles.nBtn} onClick={props.closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
