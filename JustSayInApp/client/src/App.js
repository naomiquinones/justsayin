import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
import axios from "axios";

// import { FontAwesomeIcon } from 'react-fontawesome'
// import { fa-globe-Americas } from '@fortawesome/free-solid-svg-icons'

// import SavedTexts from './components/SavedTexts';
import FormContainer from "./components/FormContainer";

import Loading from "./components/Loading";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      availableLanguages: [],
      sourceLanguage: "en",
      targetLanguage: "es",
      textToTranslate: "",
      translation: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchLanguages();
  }
  handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
    // instead of
    // [event.target.name] = event.target.value;
  }
  handleSubmit(event) {
    alert("in handleSubmit");
    console.log("from App handleSubmit, event is", event);
    event.preventDefault();
    this.fetchTranslation();
  }
  async fetchLanguages() {
    let response = await axios.get("http://localhost:1337/languages");

    let languages = response.data;

    let langsArray = [];
    for (var i = 0; i < languages.length; i++) {
      const codeAndName = Object.values(languages[i]);
      langsArray.push(codeAndName);
    }
    this.setState({ availableLanguages: langsArray, isLoading: false });
  }

  async fetchTranslation() {
    let response = await axios.post("http://localhost:1337/translate", {
      text: this.state.textToTranslate,
      source: this.state.sourceLanguage,
      target: this.state.targetLanguage
    });

    console.log(response);
    let translatedText = response.data;
    this.setState({ translation: translatedText });
  }

  render() {
    const {
      availableLanguages,
      isLoading,
      textToTranslate,
      targetLanguage
    } = this.state;
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
          {isLoading ? (
            <Loading message="Getting available languages" />
          ) : (
            <FormContainer
              languageList={availableLanguages}
              value={targetLanguage}
              textToTranslate={textToTranslate}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
          <p>
            For testing purposes, display text to translate:
            {this.state.textToTranslate}
          </p>
          <p>Source language: {this.state.sourceLanguage}</p>
          <p>Target: {this.state.targetLanguage}</p>
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
