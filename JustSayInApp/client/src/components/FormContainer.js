import React from "react";

import TargetLanguageSelector from "./TargetLanguageSelector";

const FormContainer = ({
  availableLanguages,
  // value,
  handleSubmit,
  handleChange,
  textToTranslate,
  targetLanguages,
  translation
}) => {
  // const addTargetLanguageSelector = event => {
  //   // add another drop-down menu here
  //   event.preventDefault();
  //   console.log("add another drop-down");
  // };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group textarea-container">
        <textarea
          className="form-input"
          name="textToTranslate"
          value={textToTranslate}
          onChange={handleChange}
          placeholder="Enter text to translate"
        />
      </div>

      <TargetLanguageSelector
        name={"targetLanguages"}
        targetLanguages={targetLanguages}
        availableLanguages={availableLanguages}
        handleChange={handleChange}
        translation={translation}
      />
      {/* <button
        className="add-button"
        name="addLang"
        type="button"
        value="addLanguage"
        onClick={addTargetLanguageSelector}
      >
        {"Add language"}
      </button> */}
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
