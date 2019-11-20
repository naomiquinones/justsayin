import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
import axios from "axios";

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
      targetLanguages: ["es", "ja"],
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
    console.log("name is", name, "value is", value);
    // if (name==="")
    this.setState({ [name]: value });
    // instead of [event.target.name] = event.target.value;
  }
  handleSubmit(event) {
    // console.log("from App handleSubmit, event is", event);
    event.preventDefault();
    for (let i = 0; i < this.state.targetLanguages.length; i++) {
      let currentTargetLanguage = this.state.targetLanguages[i];
      console.log(currentTargetLanguage);
      this.fetchTranslation(currentTargetLanguage);
    }
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

  async fetchTranslation(currentTargetLanguage) {
    let response = await axios.post("http://localhost:1337/translate", {
      text: this.state.textToTranslate,
      source: this.state.sourceLanguage,
      target: currentTargetLanguage
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
      targetLanguages,
      translation
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
              availableLanguages={availableLanguages}
              targetLanguages={targetLanguages}
              textToTranslate={textToTranslate}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              translation={translation}
            />
          )}
          <p>
            For testing purposes, display text to translate:
            {this.state.textToTranslate}
          </p>
          <p>Source language: {this.state.sourceLanguage}</p>
          <p>Target language 1: {this.state.targetLanguages[0]}</p>
          <p>Target language 2: {this.state.targetLanguages[1]}</p>{" "}
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
