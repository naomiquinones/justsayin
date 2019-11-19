import React /* , { Component } */ from "react";
/* Import Components */
// import CheckBox from '../components/CheckBox';
import Input from "../components/Input";

import TargetLanguageSelector from "../components/TargetLanguageSelector";

const FormContainer = ({
  languageCodes,
  value,
  handleSubmit,
  handleChange,
  textToTranslate
}) => {
  const handleTextChange = event => {
    handleChange(event);
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group textarea-container">
        <textarea
          className="form-input"
          name="textToTranslate"
          value={textToTranslate}
          onChange={handleTextChange}
          placeholder="Enter text to translate"
        ></textarea>
      </div>

      <TargetLanguageSelector
        name={"targetLanguage"}
        languages={languageCodes}
        value={value}
        handleChange={handleChange}
      />

      <Input type={"submit"} value={"Translate"} />
    </form>
  );
};
export default FormContainer;
