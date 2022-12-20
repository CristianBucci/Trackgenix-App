import styles from './spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <img src="/assets/images/spinner.gif" alt="spinner" />
    </div>
  );
};
