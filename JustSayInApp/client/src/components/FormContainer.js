import React /* , { Component } */ from "react";
/* Import Components */
// import CheckBox from '../components/CheckBox';
import Input from "../components/Input";

import TargetLanguageSelector from "../components/TargetLanguageSelector";

const FormContainer = props => {
  const {
    languageCodes,
    value,
    handleSubmit,
    handleChange,
    textToTranslate
  } = props;
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
          textToTranslate={textToTranslate}
        ></textarea>
      </div>

      <TargetLanguageSelector
        name={"language-list"}
        languages={languageCodes}
        value={value}
        handleChange={handleChange}
      />

      <Input type={"submit"} value={"Translate"} />
    </form>
  );
};
export default FormContainer;
