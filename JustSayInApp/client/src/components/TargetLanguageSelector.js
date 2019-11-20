import React from "react";

const TargetLanguageSelector = ({ languages, handleChange, value, name }) => {

  const languageOptions = languages.map(language => {
    return (
      <option key={language[0]} value={language[0]}>
        {language[1]}
      </option>
    );
  });

  return (
    <div className="form-group target-lang-selector">
      <p className="select-instruction">Select one or more target languages</p>

      <div className="form-group select-group">
        <select
          className="language-list select-container"
          id={"languages-list"}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder="Add target language"
        >
          {languageOptions}
        </select>
      </div>
    </div>
  );
};

export default TargetLanguageSelector;
