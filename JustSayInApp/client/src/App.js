import React, { Component } from "react";
import { Route, Link } from "react-router-dom";import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
import axios from "axios";

// import SavedTexts from './components/SavedTexts';
import Translation from "./components/Translation";

import Loading from "./components/Loading";

import Messages from "./components/Messages";

class App extends Component {
  state = {
    isLoading: true,
    availableLanguages: [],
    sourceLanguage: "en",
    targetLanguages: ["es", "ja"],
    textToTranslate: "",
    // allTranslations: [],
    formattedTranslations: [],
    translation: ""
  };

  componentDidMount() {
    this.fetchLanguages();
  }

  updateState = changes => {
    this.setState(changes);
  };

  clearAllTranslations = () => {
    this.setState({ allTranslations: [], formattedTranslations: [] });
  };

  sendMessages = recipients => {
    // get list of unique recipients' target languages
    
    // get the necessary translations

    // match translations with recipients

    // send all recipients with their translations to endpoint
    for (let recipient of recipients) {
      let number = recipient.name;
      let msg = recipient.msg;
      axios.post("/messages", number, msg);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.clearAllTranslations();
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
      formattedTranslations: this.state.formattedTranslations.concat({
        language: currentLanguageName,
        message: translatedText
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
      t => {
        return (
          <p key={t.language}>
            {t.language}: {t.message}
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
          <nav className="page-nav">
            <Link to="/messages">Messages</Link>
          </nav>
        </header>
        <main>
          {isLoading ? (
            <Loading message="Getting available languages" />
          ) : (
            <Translation
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
          <Route path="/messages" component={Messages} />
          <form className="recipient-box">
            <fieldset>
              <legend>Recipients</legend>
              <input id="1" language="es" type="checkbox" />
              <label htmlFor="1">Naomi</label>
              <br />
              <input id="2" type="checkbox" language="th" />
              <label htmlFor="2">Noi</label>
            </fieldset>
            <br />
            <input
              type="submit"
              value="Send message"
              onClick={this.sendMessages}
            />
          </form>
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}
export default App;
