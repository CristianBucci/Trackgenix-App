import React from 'react';

const Select = ({ value, options, keyMap, title, fieldToShow, second, onChange, isDisabled }) => {
  return (
    <select disabled={isDisabled} value={value} onChange={(event) => onChange(event.target.value)}>
      <option>--Select {title}--</option>
      {options?.map((option) => {
        return (
          <option key={option[`${keyMap}`]} value={option[`${keyMap}`]}>
            {option[`${fieldToShow}`]} {second ? option[`${second}`] : null}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
