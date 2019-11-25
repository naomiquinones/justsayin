import React from "react";

import TargetLanguageSelector from "./TargetLanguageSelector";

const Translation = ({
  availableLanguages,
  // value,
  handleSubmit,
  handleChange,
  textToTranslate,
  targetLanguages,
  translation,
  formattedTranslations
}) => {
  const showFormattedTranslations = formattedTranslations.map(
    t => {
      return (
        <p key={t.language}>
          {t.language}: {t.message}
        </p>
      );
    }
  );

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group textarea-container">
          <textarea
            className="form-input"
            name="textToTranslate"
            value={textToTranslate}
            onChange={e => {
              handleChange({ textToTranslate: e.target.value });
            }}
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
        <div className="form-group">
          <input
            className="form-input"
            id="submit"
            type="submit"
            value="Translate"
          />
        </div>
      </form>
      <section className="display">
        {showFormattedTranslations.length ? (
          <h2>Translations:</h2>
        ) : null}
        {showFormattedTranslations.length
          ? showFormattedTranslations
          : null}
      </section>
    </div>
  );
};
export default Translation;
