import React from "react";
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

  // check if it needs to be async/await
  const translate = async (message, targetLanguages) => {
    // translations will be in form of {"es": "Hola", "jp": "こんにちは"}
    const translations = await Object.fromEntries(
      targetLanguages.map(targetLang => [
        targetLang,
        axios.post("http://localhost:1337/translate", {
          text: message,
          source: "en",
          target: targetLang
        })
      ])
    );
    return translations;
  };

  const sendMessage = (message, group) => {
    const targetLangs = [
      ...new Set(group.map(currentContact => currentContact.language))
    ];
    const translations = translate(message, targetLangs);
    // const response = group.map(currentContact => {
    //   return axios.post("http://localhost:1337/sendmessage", {
    //     group,
    //     message
    //   });
    // });
    const response = group.map(currentContact => {});
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
      <div key={index} className="contact-info">
        <input
          id={c.id}
          language={c.target_language_code}
          type="checkbox"
          name={c.phone}
          checked={recipients.includes(c.phone)}
          onChange={e => toggleRecipient(e.currentTarget.name)}
        />
        <label htmlFor={c.id}>
          {c.first_name} <span className="phone">{c.phone}</span>
        </label>
        <br />
      </div>
    );
  });
  // const sendMessages = recipients => {

  //   // get the necessary translations

  //   // match translations with recipients

  //   // send all recipients with their translations to endpoint
  //   for (let recipient of recipients) {
  //     let number = recipient.name;
  //     let msg = recipient.msg;
  //     axios.post("/messages", number, msg);
  //   }
  // };
  const sendMessages = event => {
    event.preventDefault();
    if (!message || message === "" || message === " ") {
      return alert("Please enter message text");
    }
    //   // get list of unique recipients' target languages
    const group = contacts.filter(c => recipients.includes(c.phone));
    setSendMessageResult(sendMessage(message, group));
    // send a phone number and message to endpoint
    console.log("submitted");
  };

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
