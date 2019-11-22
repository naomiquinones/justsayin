import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
import axios from "axios";

// import SavedTexts from './components/SavedTexts';
import FormContainer from "./components/FormContainer";

import Loading from "./components/Loading";

class App extends Component {
  state = {
    isLoading: true,
    availableLanguages: [],
    sourceLanguage: "en",
    targetLanguages: ["es", "ja"],
    textToTranslate: "",
    allTranslations: [],
    formattedTranslations: [],
    translation: ""
  };

  componentDidMount() {
    this.fetchLanguages();
  }

  updateState = changes => {
    this.setState(changes);
  };

  // clearAllTranslations = () => {
  //   console.log("cleared", this.state.allTranslations);
  // };
  handleSubmit = event => {
    this.setState({ allTranslations: [] });
    console.log(
      "handleSubmit should have cleared previous translations",
      this.state.allTranslations
    );
    event.preventDefault();
    for (let i = 0; i < this.state.targetLanguages.length; i++) {
      let currentTargetLanguage = this.state.targetLanguages[i];
      this.fetchTranslation(currentTargetLanguage);
    }
  };
  async fetchLanguages() {
    if (this.state.availableLanguages.length < 80) {
      let response = await axios.get("http://localhost:1337/languages");

      let languages = response.data;

      let langsArray = [];
      for (var i = 0; i < languages.length; i++) {
        const codeAndName = Object.values(languages[i]);
        langsArray.push(codeAndName);
      }
      this.setState({ availableLanguages: langsArray, isLoading: false });
    }
  }

  async fetchTranslation(currentTargetLanguage) {
    let response = await axios.post("http://localhost:1337/translate", {
      text: this.state.textToTranslate,
      source: this.state.sourceLanguage,
      target: currentTargetLanguage
    });

    let currentLanguage = this.state.availableLanguages.filter(
      lang => lang[0] === currentTargetLanguage
    );
    let currentLanguageName = currentLanguage[0][1];

    let translatedText = response.data;
    this.setState({
      allTranslations: this.state.allTranslations.concat(translatedText),
      formattedTranslations: this.state.formattedTranslations.concat({
        [currentLanguageName]: translatedText
      })
    });

    this.setState({ translation: translatedText });
  }

  render() {
    const {
      availableLanguages,
      isLoading,
      textToTranslate,
      targetLanguages,
      translation
    } = this.state;

    const displayTranslationsWithLanguages = this.state.formattedTranslations.map(
      translation => {
        return (
          <p key={translation} className="translation">
            {Object.keys(translation)}: {Object.values(translation)}
          </p>
        );
      }
    );

    return (
      <div className="App">
        <header className="page-header">
          <h1>
            <img
              src={JustSayInlogo}
              className="JustSayIn-logo"
              alt="Just Say In"
              title="Just Say In"
            />
          </h1>
        </header>
        <main>
          {isLoading ? (
            <Loading message="Getting available languages" />
          ) : (
            <FormContainer
              availableLanguages={availableLanguages}
              targetLanguages={targetLanguages}
              textToTranslate={textToTranslate}
              handleChange={this.updateState}
              handleSubmit={this.handleSubmit}
              translation={translation}
            />
          )}

          <section className="display">
            {displayTranslationsWithLanguages.length ? (
              <h2>Translations:</h2>
            ) : null}
            {displayTranslationsWithLanguages.length
              ? displayTranslationsWithLanguages
              : null}
          </section>
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
