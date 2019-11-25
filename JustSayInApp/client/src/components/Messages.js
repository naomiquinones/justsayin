import React from "react";

const Messages = ({textToTranslate, handleChange}) => {
  const [message, setMessage] = React.useState('');
  const sendMessages = () => {
    console.log('message sent');

  }
  return (
    <form className="recipient-box">
      <div className="form-group textarea-container">
        <textarea
          className="form-input"
          name="textToTranslate"
          value={message}
          onChange={e => {
            setMessage({ textToTranslate: e.target.value });
          }}
          placeholder="Enter text to send"
        />
      </div>

      <fieldset>
        <legend>Recipients</legend>
        <input id="1" language="es" type="checkbox" />
        <label htmlFor="1">Naomi</label>
        <br />
        <input id="2" type="checkbox" language="th" />
        <label htmlFor="2">Noi</label>
      </fieldset>
      <br />
      <input
        type="submit"
        value="Send message"
        onClick={sendMessages()}
      />
    </form>
  )
}
export default Messages;