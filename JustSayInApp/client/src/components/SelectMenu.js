import React /* , { Component } */ from "react";

// class SelectMenu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedOption: null
//     };
//   }
//   handleChange = selectedOption => {
//     this.setState({ selectedOption });
//     console.log(`Option selected: ${selectedOption}`);
//   };
//   render() {
//     const optionsList = props.languages.map(language => {
//       return language[0];
//     });
//     const { selectedOption } = this.state;
//     return (
//       <div className="form-group">
//         <label htmlFor={this.props.name} className="form-label">
//           {this.props.title}
//         </label>
//         <select
//           className="form-input language-list select-container"
//           id={this.props.name}
//           name={this.props.name}
//           value={selectedOption}
//           onChange={this.props.handleChange}
//           placeholder={this.props.placeholder}
//           options={options}
//         ></select>
//       </div>
//     );
//   }
// }

const SelectMenu = props => {
  const { languages } = props;
  const languageOptions = languages.map(language => {
    return <option>{language[1]}</option>;
  });
  return (
    <div className="form-group select-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <select
        className="form-input language-list select-container"
        id={props.name}
        name={props.name}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      >
        {languageOptions}
      </select>
    </div>
  );
};
export default SelectMenu;
