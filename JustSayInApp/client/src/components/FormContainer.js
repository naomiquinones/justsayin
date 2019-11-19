import React /* , { Component } */ from "react";
/* Import Components */
// import CheckBox from '../components/CheckBox';
import Input from "../components/Input";
import TextArea from "../components/TextArea";

import TargetLanguageSelector from "../components/TargetLanguageSelector";
import Loading from "../components/Loading";
// class FormContainer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//     this.handleChange = this.handleChange.bind(this);
//     this.handleFormSubmit = this.handleFormSubmit.bind(this);
//     this.handleClearForm = this.handleClearForm.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleFormSubmit() {
//     console.log("Submitting form");
//   }
//   handleClearForm() {
//     console.log("Clearing form");
//   }

//   render() {
//     const { languageCodes, isLoading } = this.props;
//     return (
//       <form className="form-container" onSubmit={this.handleFormSubmit}>
//         <TextArea placeholder={"Enter text to translate"} name={"sourceText"} />
//         {isLoading ? (
//           <Loading message={"Getting target languages"} />
//         ) : (
//           <TargetLanguageSelector
//             name={"language-list"}
//             languages={languageCodes}
//           />
//         )}
//         <Input type={"submit"} value={"Translate"} />
//       </form>
//     );
//   }
// }

const FormContainer = props => {
  const {
    languageCodes,
    isLoading,
    value,
    handleSubmit,
    handleChange,
    textToTranslate
  } = props;
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <TextArea
        placeholder={"Enter text to translate"}
        name={"textToTranslate"}
        textToTranslate={textToTranslate}
        handleChange={handleChange}
      />

      {isLoading ? (
        <Loading message={"Getting target languages"} />
      ) : (
        <TargetLanguageSelector
          name={"language-list"}
          languages={languageCodes}
          value={value}
          handleChange={handleChange}
        />
      )}

      <Input type={"submit"} value={"Translate"} />
    </form>
  );
};
export default FormContainer;
