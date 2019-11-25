import React from "react";
import axios from "axios";

import Loading from "./Loading";
import TargetLanguageSelector from "./TargetLanguageSelector";

const Translation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableLanguages, setAvailableLanguages] = React.useState([]);
  const sourceLanguage = "en";
  const [targetLanguages, setTargetLanguages] = React.useState(["es", "ja"]);
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [formattedTranslations, setFormattedTranslations] = React.useState([]);
  const [translation, setTranslation] = React.useState("");

  React.useEffect(() => {
    fetchLanguages();
  });

  // this is supposed to set the textToTranslate state to whatever the user types in
  // const handleTextToTranslateChange = event => {
  //   console.log("handleTextToTranslate",event)
  //   setTextToTranslate({ textToTranslate: event.target.value });
  // }
  const handleTargetLanguagesChange = event => {
    console.log("event.target.value", event.target);
    setTargetLanguages({ ...targetLanguages, targetLanguages: event.target });
  };

  const clearAllTranslations = () => {
    setFormattedTranslations([]);
  };
  const handleSubmit = event => {
    event.preventDefault();
    clearAllTranslations();
    for (let i = 0; i < targetLanguages.length; i++) {
      let currentTargetLanguage = targetLanguages[i];
      fetchTranslation(currentTargetLanguage);
    }
  };
  // const updateState = changes => {
  //   this.setState(changes);
  // };

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
      // this.setState({ availableLanguages: langsArray, isLoading: false });
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
    console.log("translatedText", translatedText);
    // let oldFormattedTranslations = [...formattedTranslations];
    // oldFormattedTranslations.push({
    //   language:currentLanguageName,
    //   message: translatedText
    // })
    // setFormattedTranslations(oldFormattedTranslations)
    // setFormattedTranslations(
    //   formattedTranslations.concat({
    //     language: currentLanguageName,
    //     message: translatedText
    //   })
    // );
    setFormattedTranslations(formattedTranslations => [
      ...formattedTranslations,
      {
        language: currentLanguageName,
        message: translatedText
      }
    ]);

    console.log("formattedTranslations", formattedTranslations);
    // this.setState({
    //   formattedTranslations: formattedTranslations.concat({
    //     language: currentLanguageName,
    //     message: translatedText
    //   })
    // });
    // console.log(formattedTranslations);

    setTranslation(translatedText);
    // this.setState({ translation: translatedText });
  };

  const showFormattedTranslations = formattedTranslations.map(t => {
    return (
      <p key={t.language}>
        {t.language}: {t.message}
      </p>
    );
  });

  return (
    <div>
      {isLoading ? (
        <Loading message="Getting available languages" />
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
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
      <section className="display">
        {showFormattedTranslations.length ? <h2>Translations:</h2> : null}
        {showFormattedTranslations.length ? showFormattedTranslations : null}
      </section>
    </div>
  );
};
export default Translation;
