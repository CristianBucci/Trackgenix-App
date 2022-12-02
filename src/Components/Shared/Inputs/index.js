import styles from './input.module.css';

const Input = ({
  label,
  disabled,
  id,
  register,
  name,
  required,
  placeholder,
  type,
  error,
  show,
  showState
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputcontainer}>
        <input
          className={`${disabled && styles.disabled} ${styles.input}`}
          disabled={disabled}
          id={id}
          name={name}
          {...register(name)}
          required={required}
          placeholder={placeholder}
          type={type}
        />
        {(label === 'Password' || label === 'Repeat Password') && (
          <img
            className={styles.eye}
            onClick={show}
            src={
              showState
                ? '/assets/images/eye-icon-png-13.jpg'
                : '/assets/images/eyes-closed-eyes.png'
            }
          />
        )}
      </div>
      {error && <p className={styles.inputError}> {error} </p>}
    </div>
  );
};

export default Input;
