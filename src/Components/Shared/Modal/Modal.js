import React from 'react';
import Button from '../Button/Button';
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
          <Button btnText={'Yes'} function={props.modalFunction} btnType={'prim'} />
          <Button btnText={'No'} function={props.closeModal} btnType={'sec'} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
