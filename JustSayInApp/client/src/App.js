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
      value: "es"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchLanguages();
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
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
    let translation = response.data;
    return translation;
  }

  render() {
    const { availableLanguages, isLoading, value } = this.state;
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
            onSubmit={this.handleSubmit}
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
