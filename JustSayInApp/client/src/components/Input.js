import React/* , { Component } */ from 'react';

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
const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <input className="form-input" 
        id={props.name} 
        name={props.name} 
        type={props.type} 
        value={props.value} 
        onChange={props.handleChange} 
        placeholder={props.placeholder}
      />
    </div>
  )
}
export default Input;