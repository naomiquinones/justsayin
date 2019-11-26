import React from "react";

const Messages = ({ textToTranslate, handleChange }) => {
  const [message, setMessage] = React.useState("");
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    // getContacts();
  }, []);

  const sendMessages = event => {
    event.preventDefault();
    if (!message || message === "" || message === " ") {
      return alert("Please enter message text");
    }

    console.log("submitted");
  };
  const getContacts = () => {
    const fakeContactsArray = ["Amber", "Bonnie", "Clara"];
    setContacts(fakeContactsArray);
  };
  return (
    <form className="recipient-box" onSubmit={sendMessages}>
      <div className="form-group textarea-container">
        <textarea
          className="form-input"
          name="textToTranslate"
          value={message}
          onChange={event => setMessage(event.target.value)}
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
      <input type="submit" value="Send message" />
    </form>
  );
};
export default Messages;
