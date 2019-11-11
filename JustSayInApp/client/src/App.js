import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
import cookie from "react-cookies";

import { googleTranslate } from "../../utils/googleTranslate";
// import SavedTexts from './components/SavedTexts';
import FormContainer from "./components/FormContainer";

class App extends Component {
  state = {
    languageCodes: [],
    language: cookie.load("language") ? cookie.load("language") : "en",
    question: cookie.load("question")
      ? cookie.load("question")
      : "What language do you prefer to use?"
  };

  componentDidMount() {
    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      console.log(
        "in componentDidMount, running googleTranslate.getSupportedLanguages",
        languageCodes
      );
      getLanguageCodes(languageCodes);
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

  render() {
    const { languageCodes, language, question } = this.state;
    console.log("from app, language codes:", languageCodes);
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
          {/* <SavedTexts /> */}
          <p>{question}</p>
          {/* iterate through language options to create a select box */}
          <select
            className="select-language"
            value={language}
            onChange={e => this.changeHandler(e.target.value)}
          >
            {languageCodes.map(lang => (
              <option key={lang.language} value={lang.language}>
                {lang.name}
              </option>
            ))}
          </select>
          <FormContainer languageCodes={languageCodes} />
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }

  changeHandler = language => {
    let { question } = this.state;
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = transQuestion => {
      if (question !== transQuestion) {
        this.setState({ question: transQuestion });
        cookie.save("question", transQuestion, { path: "/" });
      }
    };

    // translate the question when selecting a different language
    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, function(err, translation) {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };
}

export default App;
