import React from 'react';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ show, onCancel, onConfirm, modalTitle, modalContent }) => {
  return (
    show && (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <h1 className={styles.modalTitle}>{modalTitle}</h1>
          <p className={styles.modalText}>{modalContent}</p>
          <div>
            <button className={`${styles.modalBtn} ${styles.BtnCancel}`} onClick={onCancel}>
              Cancel
            </button>
            <button onClick={onConfirm} className={`${styles.modalBtn} ${styles.BtnConfirm}`}>
              Confirm
            </button>
            <button className={styles.link2} onClick={onCancel}>
              X
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalConfirm;
