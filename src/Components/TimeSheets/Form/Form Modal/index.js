import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{props.title}</h3>
        <div className={styles.buttonsDiv}>
          <button onClick={props.closeModal} className={styles.buttonConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
