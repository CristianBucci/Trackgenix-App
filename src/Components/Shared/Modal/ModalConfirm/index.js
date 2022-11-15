import React from 'react';
import Buttons from '../../Button/index';
import deleteItem from '../../../Utils/Delete/index';
import { useDispatch } from 'react-redux';
import { confirmModalClose } from '../../../../redux/timesheets/actions';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({ show, modalFunction, modalTitle, modalContent }) => {
  const dispatch = useDispatch();
  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <span className={styles.header}>
            <p>{modalTitle}</p>
            <button
              className={styles.modalCloseButton}
              onClick={() => dispatch(confirmModalClose())}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/close.svg`} alt="Close icon" />
            </button>
          </span>
          <div className={styles.content}>
            <span>{modalContent}</span>
            <span>
              <Buttons
                variant="secondary"
                name="Cancel"
                onClick={() => dispatch(confirmModalClose())}
              />
              <Buttons
                variant="primary"
                name="Confirm"
                onClick={() => {
                  modalFunction.id ? deleteItem(modalFunction) : modalFunction();
                  dispatch(confirmModalClose());
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
