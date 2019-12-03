import React from "react";

const TargetLanguageSelector = ({
  availableLanguages,
  handleChange,
  name,
  targetLanguages
}) => {
  const languageOptions = availableLanguages.map(language => {
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
          multiple
          className="language-list select-container"
          id={"languages-list"}
          name={name}
          value={targetLanguages}
          onChange={e => {
            handleChange(
              Array.apply(null, e.currentTarget.options)
                .filter(opt => opt.selected)
                .map(opt => opt.value)
            );
          }}
        >
          {languageOptions}
        </select>
      </div>
    </div>
  );
};

export default TargetLanguageSelector;
