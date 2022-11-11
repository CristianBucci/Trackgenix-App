import React from 'react';
import Buttons from '../Button/index';
import styles from './modal.module.css';

const del = async ({ id, path, list, setList, setModalContent, setShowModalMessage }) => {
  console.log(id);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setModalContent({
        title: 'SUCCESS!',
        content: `${path} whit id ${id} successfully deleted`
      });
      setShowModalMessage(true);
      setList([...list.filter((item) => item._id !== id)]);
    } else {
      setModalContent({
        title: 'ERROR!',
        content: `${path} could not be removed.`
      });
      setShowModalMessage(true);
    }
  } catch (error) {
    alert(`${path} could not be removed.`, error);
  }
};

const ModalMessage = ({ show, closeModal, modalFunction, modalTitle, modalContent }) => {
  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <span className={modalTitle.includes('ERROR') ? styles.header : styles.headerSuccess}>
            <p>{modalTitle}</p>
            <button
              className={styles.modalCloseButton}
              onClick={() => {
                closeModal(false);
                modalFunction && modalTitle.includes('SUCCESS') && modalFunction();
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
                  modalFunction.id ? del(modalFunction) : modalFunction(modalId);
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

export { ModalMessage, ModalConfirm, del };
