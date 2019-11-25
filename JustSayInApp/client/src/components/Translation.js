import React from "react";
import axios from "axios";

import Loading from "./Loading";
import TargetLanguageSelector from "./TargetLanguageSelector";

const Translation = ({
  handleChange}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableLanguages, setAvailableLanguages] = React.useState([]);
  const sourceLanguage='en';
  const [targetLanguages, setTargetLanguages] = React.useState(['es','ja']);
  const [textToTranslate, setTextToTranslate] = React.useState('');
  const [formattedTranslations, setFormattedTranslations] = React.useState([]);
  const [translation, setTranslation] = React.useState('');

  React.useEffect(()=>{
    fetchLanguages();
  })
  const handleTextToTranslateChange = event => {
    setTextToTranslate({ textToTranslate: event.target.value });
  }
  const handleTargetLanguagesChange = event => {
    const {value} = event.target;
    setTargetLanguages({...targetLanguages,[targetLanguages]: value})
  }
  
  const clearAllTranslations = () => {
    this.setState({ allTranslations: [], formattedTranslations: [] });
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
  }

  const fetchTranslation = async (currentTargetLanguage) => {
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
    
    setFormattedTranslations(formattedTranslations.concat({
      language: currentLanguageName,
      message: translatedText
    }));
    // this.setState({
    //   formattedTranslations: formattedTranslations.concat({
    //     language: currentLanguageName,
    //     message: translatedText
    //   })
    // });
    setTranslation(translatedText)
    // this.setState({ translation: translatedText });
  }


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
          {isLoading ? (
            <Loading message="Getting available languages" />
          ) : (
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group textarea-container">
          <textarea
            className="form-input"
            name="textToTranslate"
            value={textToTranslate}
            onChange={handleTextToTranslateChange}
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
