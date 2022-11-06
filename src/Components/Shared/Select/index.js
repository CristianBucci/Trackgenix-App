import React from 'react';

const Select = ({ value, options, title, fieldToShow, second, onChange }) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option>--Select {title}--</option>
      {options?.map((option) => {
        return (
          <option key={option._id} value={option._id}>
            {option[`${fieldToShow}`]} {second ? option[`${second}`] : null}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
