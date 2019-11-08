import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
import cookie from "react-cookies";

import { googleTranslate } from "./utils/googleTranslate";
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
      getLanguageCodes(languageCodes);
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

  render() {
    const { languageCodes, language, question } = this.state;

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
          <FormContainer />
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
