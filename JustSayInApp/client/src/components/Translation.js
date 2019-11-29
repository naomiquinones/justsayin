import React from "react";
import axios from "axios";

import Loading from "./Loading";
import TargetLanguageSelector from "./TargetLanguageSelector";

const Translation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableLanguages, setAvailableLanguages] = React.useState([]);
  const sourceLanguage = "en";
  const [targetLanguages, setTargetLanguages] = React.useState(["es", "ja", "ar", "zh"]);
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [formattedTranslations, setFormattedTranslations] = React.useState([]);
  const [translation, setTranslation] = React.useState("");

  React.useEffect(() => {
    fetchLanguages();
  });

  const handleTargetLanguagesChange = data => {
    console.log("handleTargetLanguagesChange event", data);
    setTargetLanguages(data);
  };

  const clearAllTranslations = () => {
    setFormattedTranslations([]);
  };
  const handleTranslationRequest = event => {
    event.preventDefault();
    if (!textToTranslate || textToTranslate === "" || textToTranslate === " ") {
      return alert("Please enter text to translate");
    }
    clearAllTranslations();
    console.log("cleared", formattedTranslations);
    for (let i = 0; i < targetLanguages.length; i++) {
      let currentTargetLanguage = targetLanguages[i];
      fetchTranslation(currentTargetLanguage);
    }
  };

  const fetchLanguages = async () => {
    if (availableLanguages.length < 80) {
      let response = await axios.get("http://localhost:1337/languages");

      let languages = response.data;

      let langsArray = [];
      for (var i = 0; i < languages.length; i++) {
        const codeAndName = Object.values(languages[i]);
        langsArray.push(codeAndName);
      }
      setAvailableLanguages(langsArray);
      setIsLoading(false);
    }
  };

  const fetchTranslation = async currentTargetLanguage => {
    let response = await axios.post("http://localhost:1337/translate", {
      text: textToTranslate,
      source: sourceLanguage,
      target: currentTargetLanguage
    });

    let currentLanguage = availableLanguages.filter(
      lang => lang[0] === currentTargetLanguage
    );
    let currentLanguageName = currentLanguage[0][1];
    let translatedText = response.data;

    setFormattedTranslations(formattedTranslations => [
      ...formattedTranslations,
      {
        language: currentLanguageName,
        message: translatedText
      }
    ]);

    setTranslation(translatedText);
  };

  const showFormattedTranslations = formattedTranslations.map(t => {
    return (
      <p key={t.language} className="translation">
        <span className="lang">{t.language}:</span> {t.message}
      </p>
    );
  });

  React.useEffect(() => {
    console.log("formattedTranslations", formattedTranslations);
  }, [formattedTranslations]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading message="Getting available languages" />
      ) : (
        <form className="form-container" onSubmit={handleTranslationRequest}>
          <div className="form-group textarea-container">
            <textarea
              className="form-input"
              name="textToTranslate"
              value={textToTranslate}
              onChange={event => setTextToTranslate(event.currentTarget.value)}
              placeholder="Enter text to translate"
            />
          </div>

          <TargetLanguageSelector
            name={"targetLanguages"}
            targetLanguages={targetLanguages}
            availableLanguages={availableLanguages}
            handleChange={handleTargetLanguagesChange}
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
      )}
      <section className="results translations-display">
        {showFormattedTranslations.length ? <h2>Translations:</h2> : null}
        {showFormattedTranslations.length ? showFormattedTranslations : null}
      </section>
    </React.Fragment>
  );
};
export default Translation;
