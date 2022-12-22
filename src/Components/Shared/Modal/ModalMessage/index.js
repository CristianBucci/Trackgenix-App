import React from 'react';
import styles from './modalMessage.module.css';

const ModalMessage = ({ show, modalFunction, modalTitle, modalContent }) => {
  return (
    show && (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <h1
            className={
              modalTitle.includes('ERROR') ? styles.modalTitleError : styles.modalTitleSuccess
            }
          >
            {modalTitle}
          </h1>
          <p className={styles.modalText}>{modalContent}</p>
          <div>
            <button onClick={modalFunction} className={`${styles.modalBtn} ${styles.BtnConfirm}`}>
              Accept
            </button>
            <button className={styles.link2} onClick={modalFunction}>
              X
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalMessage;
