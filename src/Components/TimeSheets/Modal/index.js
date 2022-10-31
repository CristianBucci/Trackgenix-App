import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  const onCloseModal = () => {
    props.deleteTimeSheet(props.timeSheetId);
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{props.title}</h3>
        <div className={styles.buttonsDiv}>
          <div>
            <button onClick={props.closeModal} className={styles.buttonCancel}>
              Cancel
            </button>
          </div>
          <div>
            <button
              className={styles.buttonConfirm}
              onClick={() => {
                onCloseModal();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
