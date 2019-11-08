import React /* , { Component } */ from "react";

// class SelectMenu extends Component {
//   state = {
//     selectedOption: null,
//   };

//   handleChange = selectedOption => {
//     this.setState({ selectedOption });
//     console.log(`Option selected: ${selectedOption}`);
//   }
//   render() {
//     const { selectedOption } = this.state;
//     return (
//       <div className="form-group">
//         <label htmlFor={this.props.name} className="form-label">{this.props.title}</label>
//         <Select className="form-input"
//           id={this.props.name}
//           name={this.props.name}
//           value={selectedOption}
//           onChange={this.handleChange}
//           placeholder={this.props.placeholder}
//           options={options}
//           isMulti={true}
//         />
//       </div>
//     )
//   }
// }

const SelectMenu = props => {
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
      ></select>
    </div>
  );
};
export default SelectMenu;
