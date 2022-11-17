import React from 'react';
import Buttons from '../../Button/index';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ show, modalTitle, modalContent, onConfirm, onCancel }) => {
  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <span className={styles.header}>
            <p>{modalTitle}</p>
            <button className={styles.modalCloseButton} onClick={onCancel}>
              <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
            </button>
          </span>
          <div className={styles.content}>
            <span>{modalContent}</span>
            <span>
              <Buttons variant="secondary" name="Cancel" onClick={onCancel} />
              <Buttons variant="primary" name="Confirm" onClick={onConfirm} />
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalConfirm;
