import React from 'react';
import { Link } from 'react-router-dom';
import styles from './modal.module.css';

const Modal = ({ content, contentMessage, title, setModalDisplay }) => {
  return (
    <div id="id-screen" className={styles.screen}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3 className={styles.header__title}>{title}</h3>
          <button className={styles.header__button} onClick={() => setModalDisplay(false)}>
            <i className="fa-solid fa-square-xmark fa-2xl"></i>
          </button>
        </header>
        <div className={styles.content}>
          {content ?? null}
          {contentMessage ? <p className={styles.content__message}>{contentMessage}</p> : null}
          <button
            className={`${styles.options__button} ${styles.options__close}`}
            onClick={() => {
              setModalDisplay(false);
              if (title !== 'Error') {
                <Link to={'/employees'}></Link>;
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
