import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";

// import SavedTexts from './components/SavedTexts';
import FormContainer from "./components/FormContainer";

import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      availableLanguages: [],
      source: "en",
      value: "es",
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
    const {name, value} = event.target
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
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
    // console.log("full names", this.state.languages);
  }

  async fetchTranslation() {
    let response = await axios.post("http://localhost:1337/translate", {
      text: this.state.text,
      source: this.state.source,
      target: this.state.value
    });

    console.log(response);
    let translatedText = response.data;
    this.setState({ translation: translatedText });
  }

  render() {
    const {
      availableLanguages,
      isLoading,
      value,
      textToTranslate
    } = this.state;
    console.log("isLoading", isLoading);
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
          <FormContainer
            languageCodes={availableLanguages}
            isLoading={isLoading}
            value={value}
            textToTranslate={textToTranslate}
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
