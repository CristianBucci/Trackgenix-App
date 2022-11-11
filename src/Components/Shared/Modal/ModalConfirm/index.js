import React from 'react';
import Buttons from '../../Button/index';
import deleteItem from '../../../Utils/Delete/index';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ show, closeModal, modalFunction, modalTitle, modalContent, modalId }) => {
  return (
    show && (
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
              <Buttons variant="secondary" name="Cancel" onClick={() => closeModal(false)} />
              <Buttons
                variant="primary"
                name="Confirm"
                onClick={() => {
                  modalFunction.id ? deleteItem(modalFunction) : modalFunction(modalId);
                  closeModal(false);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalConfirm;
