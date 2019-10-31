import React/* , { Component } */ from 'react';

// class TextArea extends Component {
//   constructor() {
//     super();
//     this.state = {
//       textToTranslate: ''
//     }
//   }

//   componentDidMount() {
    
//   }

//   render() {
//     return (
//         <textarea></textarea>
//     );
//   }
// }

const TextArea = (props) => {
  return (
    <div className="form-group">
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