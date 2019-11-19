import React from "react";

const TargetLanguageSelector = props => {
  const { languages, handleChange, value, name } = props;
  const languageOptions = languages.map(language => {
    return (
      <option key={language[0]} value={language[0]}>
        {language[1]}
      </option>
    );
  });
  const handleSelectChange = event => {
    // console.log("in handleSelectChange,", event);
    handleChange(event);
  };

  return (
    <div className="form-group target-lang-selector">
      <p className="select-instruction">Select one or more target languages</p>

      <div className="form-group select-group">
        <label htmlFor={name} className="form-label">
          {"set a target language"}
        </label>
        <select
          className="form-input language-list select-container"
          id={"languages-list"}
          name={name}
          value={value}
          onChange={handleSelectChange}
          placeholder="Add target language"
        >
          {languageOptions}
        </select>
      </div>

      <button className="add-button" name="addLang" value="addLanguage">
        {"Add language"}
      </button>
    </div>
  );
};

export default TargetLanguageSelector;
