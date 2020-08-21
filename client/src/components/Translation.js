import React from "react";
import axios from "axios";

import Loading from "./Loading";
import TargetLanguageSelector from "./TargetLanguageSelector";

const Translation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableLanguages, setAvailableLanguages] = React.useState([]);
  const sourceLanguage = "en";
  const [targetLanguages, setTargetLanguages] = React.useState([
    "zh",
    "pt",
    "ar",
    "es",
  ]);
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [formattedTranslations, setFormattedTranslations] = React.useState([]);
  const [translation, setTranslation] = React.useState("");

  React.useEffect(() => {
    fetchLanguages();
  });

  // When the user selects another target language:
  const handleTargetLanguagesChange = data => {
    console.log("handleTargetLanguagesChange event", data);
    setTargetLanguages(data);
  };

  const clearAllTranslations = () => {
    setFormattedTranslations([]);
    console.log("cleared", formattedTranslations);
  };

  // When user clicks the Translate button
  const handleTranslationRequest = event => {
    event.preventDefault();
    // some validation, alert user if no text submitted
    if (!textToTranslate || textToTranslate === "" || textToTranslate === " ") {
      return alert("Please enter text to translate");
    }
    // clear any previous translations out of the formattedTranslations array
    clearAllTranslations();

    for (let i = 0; i < targetLanguages.length; i++) {
      let currentTargetLanguage = targetLanguages[i];
      fetchTranslation(currentTargetLanguage);
    }
  };

  const fetchLanguages = async () => {
    if (availableLanguages.length < 80) {
      let response = await axios.get("/languages");

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

  const fetchTranslation = async currentTargetLanguageCode => {
    let response = await axios.post("/translate", {
      text: textToTranslate,
      source: sourceLanguage,
      target: currentTargetLanguageCode
    });
    // set variable to hold the text that came back
    let translatedText = response.data;

    // get the name associated with the language code
    let currentLanguage = availableLanguages.filter(
      lang => lang[0] === currentTargetLanguageCode
    );
    let currentLanguageName = currentLanguage[0][1];

    // take what's currently in formattedTranslations
    // add the current translation with its language
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
              placeholder="Enter text to translate (currently supports only English as the source language)"
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
