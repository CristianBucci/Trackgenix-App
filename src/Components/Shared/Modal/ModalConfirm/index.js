import React from 'react';
import Buttons from '../../Button/index';
import styles from './modalConfirm.module.css';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../../redux/projects/thunks';

const ModalConfirm = ({ show, closeModal, modalFunction, modalTitle, modalContent, modalId }) => {
  const dispatch = useDispatch();
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
                  modalFunction.id
                    ? dispatch(deleteProject(modalFunction.id))
                    : modalFunction(modalId);
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
