import React from "react";

const TextArea = props => {
  const { name, title, placeholder, textToTranslate, handleChange } = props;
  const handleTextChange = event => {
    handleChange(event);
  };

  return (
    <div className="form-group textarea-container">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <textarea
        className="form-input"
        id={name}
        name={name}
        value={textToTranslate}
        onChange={handleTextChange}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
export default TextArea;
