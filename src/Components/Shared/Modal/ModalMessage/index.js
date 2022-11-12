import React from 'react';
import { useDispatch } from 'react-redux';
import messageModalClose from '../../../../redux/projects/actions';
import styles from './modalMessage.module.css';

const ModalMessage = ({ show, modalFunction, modalTitle, modalContent }) => {
  const dispatch = useDispatch();
  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <span className={modalTitle.includes('ERROR') ? styles.header : styles.headerSuccess}>
            <p>{modalTitle}</p>
            <button
              className={styles.modalCloseButton}
              onClick={() => {
                dispatch(messageModalClose()) &&
                  modalFunction &&
                  modalTitle.includes('SUCCESS') &&
                  modalFunction();
              }}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
            </button>
          </span>
          <div className={styles.content}>
            <span>{modalContent}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalMessage;
