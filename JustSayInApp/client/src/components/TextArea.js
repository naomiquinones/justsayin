import React, { Component } from 'react';

// class TextArea extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       textToTranslate: '',
//       value: 'Text to translate'
//     }
//   }

//   this.handleChange = this.handleChange.bind(this);
//   this.handleSubmit = this.handleSubmit.bind(this);

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     console.log('Text to translate: ' + this.state.value);
//     event.preventDefault();
//   }
//   componentDidMount() {
    
//   }

//   render() {
//     return (
//       <div className="form-group textarea-container">
//         <label htmlFor={props.name} className="form-label">{props.title}</label>
//         <textarea className="form-input"
//             id={props.name} 
//             name={props.name}
//             value={this.state.value} 
//             onChange={this.handleChange} 
//         ></textarea>
//     );
//   }
// }

const TextArea = (props) => {
  return (
    <div className="form-group textarea-container">
      <label htmlFor={props.name} className="form-label">{props.title}</label>
      <textarea className="form-input" 
        id={props.name} 
        name={props.name}
        value={props.value} 
        onChange={props.handleChange} 
        placeholder={props.placeholder}
      ></textarea>
    </div>
  )
}
export default TextArea;