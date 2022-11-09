import React from 'react';
import styles from './modal.module.css';

const ModalConfirm = ({ show, closeModal, modalFunction, modalTitle, modalContent, modalId }) => {
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
          <span>
            <button onClick={() => closeModal(false)}>Cancel</button>
            <button
              onClick={() => {
                modalFunction(modalId);
                closeModal(false);
              }}
            >
              Confirm
            </button>
          </span>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default ModalConfirm;
