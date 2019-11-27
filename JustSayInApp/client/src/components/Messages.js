import React, { Fragment } from "react";
import axios from "axios";

const Messages = ({ textToTranslate, handleChange }) => {
  const [message, setMessage] = React.useState("");
  const [contacts, setContacts] = React.useState([]);
  const [recipients, setRecipients] = React.useState([]);
  const [sendMessageResult, setSendMessageResult] = React.useState([]);

  const toggleRecipient = recipient =>
    recipients.includes(recipient)
      ? setRecipients(recipients.filter(r => r !== recipient))
      : setRecipients([...recipients, recipient]);

  React.useEffect(() => {
    getContacts();
  }, []);

  const sendMessages = event => {
    event.preventDefault();
    if (!message || message === "" || message === " ") {
      return alert("Please enter message text");
    }
    const group = contacts.filter(c => recipients.includes(c.phone));
    setSendMessageResult(sendMessageResult(message, group));
    // send a phone number and message to endpoint
    console.log("submitted");
  };
  const getContacts = async () => {
    let owner_id = 1;
    let response = await axios.get("http://localhost:1337/contacts", {
      params: {
        owner_id: owner_id
      }
    });
    setContacts(response.data);
  };

  const showContacts = contacts.map((c, index) => {
    return (
      <Fragment key={index}>
        <input
          id={c.id}
          language={c.target_language_code}
          type="checkbox"
          name={c.phone}
          checked={recipients.includes(c.phone)}
          onChange={e => toggleRecipient(e.currentTarget.name)}
        />
        <label htmlFor={c.id}>
          {c.first_name} <span>{c.phone}</span>
        </label>
        <br />
      </Fragment>
    );
  });

  return (
    <>
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
          {showContacts}
        </fieldset>
        <br />
        <input type="submit" value="Send message" />
      </form>

      {sendMessageResult.length > 0 && (
        <>
          <hr />
          <h2>Results</h2>
          {sendMessageResult.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </>
      )}
    </>
  );
};
export default Messages;
