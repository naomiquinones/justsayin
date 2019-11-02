import React from "react";

const Button = props => {
  return (
    <button id={props.name} name={props.name}>
      {props.value}
    </button>
  );
};

export default Button;
