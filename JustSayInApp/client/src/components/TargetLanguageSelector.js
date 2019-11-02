import React /* , { Component } */ from "react";
import SelectMenu from "../components/SelectMenu";
import Button from "../components/Button";

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
  return (
    <div className="form-group target-lang-selector">
      <SelectMenu id={"languages-list"} placeholder={"Add target language"} />
      <Button name={"add"} value={"+"} />
    </div>
  );
};

export default TargetLanguageSelector;
