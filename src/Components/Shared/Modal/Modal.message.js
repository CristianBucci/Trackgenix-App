import React from 'react';
import styles from './modal.module.css';

const ModalMessage = ({ show, closeModal, modalTitle, modalContent }) => {
  return show ? (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <span className={styles.header}>
          <p>{modalTitle}</p>
          <button className={styles.modalCloseButton} onClick={() => closeModal(false)}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
          </button>
        </span>
        <div className={styles.content}>
          <span>{modalContent}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalMessage;
