import React from 'react';
import styles from './select.module.css';

const Select = ({
  options,
  keyMap,
  title,
  fieldToShow,
  second,
  isDisabled,
  register,
  name,
  error
}) => {
  return (
    <div className={styles.selectWrapper}>
      <select disabled={isDisabled} {...register(name)}>
        <option>--Select {title}--</option>
        {options?.map((option) => {
          return (
            <option key={option[`${keyMap}`]} value={option[`${keyMap}`]}>
              {option[`${fieldToShow}`]} {second ? option[`${second}`] : null}
            </option>
          );
        })}
      </select>
      {error && <p className={styles.selectError}> {error} </p>}
    </div>
  );
};

export default Select;
