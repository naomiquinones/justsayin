import React from "react";

const Input = props => {
  const { name, title, type, value, handleChange, placeholder } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        className="form-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;
