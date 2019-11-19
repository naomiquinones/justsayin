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
  const { languages, name, title, placeholder, value, handleChange } = props;
  const handleSelectChange = event => {
    handleChange(event);
  };

  const languageOptions = languages.map(language => {
    return (
      <option key={language[0]} value={language[0]}>
        {language[1]}
      </option>
    );
  });

  return (
    <div className="form-group select-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <select
        className="form-input language-list select-container"
        id={name}
        name={name}
        value={value}
        onChange={handleSelectChange}
        placeholder={placeholder}
      >
        {languageOptions}
      </select>
    </div>
  );
};
export default SelectMenu;
