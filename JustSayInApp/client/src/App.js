import React, { Component } from "react";
import "./App.css";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";

// import SavedTexts from './components/SavedTexts';
import FormContainer from "./components/FormContainer";

import axios from "axios";

class App extends Component {
  state = {
    languages: []
  };
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let response = await axios.get("http://localhost:1337/languages");

    console.log("hello from web");
    // console.log(response.data[0]);
    let languages = response.data;

    let langsArray = [];
    for (var i = 0; i < languages.length; i++) {
      const codeAndName = Object.values(languages[i]);
      langsArray.push(codeAndName);
    }
    this.setState({ languages: langsArray });
    console.log("full names", this.state.languages);
  }

  render() {
    const { languages: languageCodes, language, question } = this.state;
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
          <FormContainer languageCodes={languageCodes} />
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
