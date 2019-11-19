import React /* , { Component } */ from "react";
import SelectMenu from "../components/SelectMenu";

// class TargetLanguageSelector extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div id="">
//         <SelectMenu id={"languages-list"} placeholder={"Add target language"} />
//         <Button value={this.props.value} />
//       </div>
//     );
//   }
// }
const TargetLanguageSelector = props => {
  const { languages, handleChange, value, name } = props;
  return (
    <div className="form-group target-lang-selector">
      <p className="select-instruction">Select one or more target languages</p>
      <SelectMenu
        id={"languages-list"}
        placeholder={"Add target language"}
        languages={languages}
        value={value}
        handleChange={handleChange}
        title={"set a target language"}
        name={name}
      />
      <button className="add-button" name="addLang" value="addLanguage">
        {"Add language"}
      </button>
    </div>
  );
};

export default TargetLanguageSelector;
