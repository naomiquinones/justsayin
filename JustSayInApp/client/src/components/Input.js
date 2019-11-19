import React /* , { Component } */ from "react";

// class Input extends Component {
//   constructor() {
//     super();
//     this.state = {
//       type: 'submit',
//       value: 'Translate'
//     }
//   }

//   componentDidMount() {
//     console.log('input loaded');
//   }

//   render() {
//     return (
//         <input type={this.state.type} value={this.state.value} placeholder="Text to translate"></input>
//     );
//   }
// }
const Input = props => {
  const { name, title, type, value, handleChange, placeholder } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        className="form-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;
