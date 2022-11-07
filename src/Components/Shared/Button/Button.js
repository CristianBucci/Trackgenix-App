import React from 'react';

const Button = (props) => {
  return <button onClick={props.function}>{props.btnText}</button>;
};

export default Button;
