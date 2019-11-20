import React from "react";

import TargetLanguageSelector from "../components/TargetLanguageSelector";

const FormContainer = ({
  languageList,
  value,
  handleSubmit,
  handleChange,
  textToTranslate
}) => {
  const handleTextChange = event => {
    handleChange(event);
  };
  const addTargetLanguageSelector = () => {
    // add another drop-down menu here
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
        />
      </div>

      <TargetLanguageSelector
        name={"targetLanguage"}
        languages={languageList}
        value={value}
        handleChange={handleChange}
      />
      <button
        className="add-button"
        name="addLang"
        value="addLanguage"
        onClick={addTargetLanguageSelector}
      >
        {"Add language"}
      </button>
      <div className="form-group">
        <input
          className="form-input"
          id="submit"
          type="submit"
          value="Translate"
        />
      </div>
    </form>
  );
};
export default FormContainer;
