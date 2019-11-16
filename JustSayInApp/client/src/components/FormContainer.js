import React, { Component } from "react";
/* Import Components */
// import CheckBox from '../components/CheckBox';
import Input from "../components/Input";
import TextArea from "../components/TextArea";

import TargetLanguageSelector from "../components/TargetLanguageSelector";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleFormSubmit() {
    console.log("Submitting form");
  }
  handleClearForm() {
    console.log("Clearing form");
  }

  render() {
    console.log("in FormContainer", this.props);
    const { languageCodes } = this.props.languageCodes;
    return (
      <form className="form-container" onSubmit={this.handleFormSubmit}>
        <TextArea placeholder={"Enter text to translate"} name={"sourceText"} />
        <TargetLanguageSelector
          name={"language-list"}
          languages={languageCodes}
        />
        <Input type={"submit"} value={"Translate"} />
      </form>
    );
  }
}

export default FormContainer;
