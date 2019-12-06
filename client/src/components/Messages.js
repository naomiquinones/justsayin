import React from "react";
import axios from "axios";
import { Route, Link, useRouteMatch } from "react-router-dom";
import AddContacts from "./AddContacts";

const Messages = ({ match }) => {
  const [message, setMessage] = React.useState("");
  const [contacts, setContacts] = React.useState([]);
  const [recipients, setRecipients] = React.useState([]);
  const [sendMessageResult, setSendMessageResult] = React.useState([]);

  const { path, url } = useRouteMatch();

  const sourceLanguage = "en";

  const toggleRecipient = recipient =>
    recipients.includes(recipient)
      ? setRecipients(recipients.filter(r => r !== recipient))
      : setRecipients([...recipients, recipient]);

  React.useEffect(() => {
    getContacts();
  }, []);

  // get initial list of contacts to display
  const getContacts = async () => {
    let owner_id = 1;
    let response = await axios.get("/contacts", {
      params: {
        owner_id: owner_id
      }
    });
    setContacts(response.data);
  };

  const sendMessages = async event => {
    event.preventDefault();
    if (!message || message === "" || message === " ") {
      return alert("Please enter message text");
    }
    // make a list of the recipients' phone numbers
    const recipientList = contacts.filter(c => recipients.includes(c.phone));

    // collect what gets returned from the sendMessage fxn
    const messageResults = await sendMessage(message, recipientList);
    // populate the list of results for messages sent
    setSendMessageResult(messageResults);
    setMessage("");
  };

  const sendMessage = async (message, group) => {
    // get list of recipients' unique target languages so we don't send out duplicate translation requests
    const targetLangs = [
      // Set makes a unique set from a given collection
      // Here, map pulls out all the recipients' languages
      ...new Set(group.map(currentContact => currentContact.target_lang_code))
    ];

    // get the necessary translations
    const translatedMessages = await translate(
      message,
      sourceLanguage,
      targetLangs
    );

    // important: wrap in Promise.all
    const responses = await Promise.all(
      group.map(async currentRecipient => {
        // return result of posting phone number and message to endpoint
        const msgResponse = await axios.post("/sendmessage", {
          number: currentRecipient.phone,
          // match translation language with recipient's target language
          // to get the corresponding translation
          message: translatedMessages[currentRecipient.target_lang_code]
        });
        return msgResponse.data;
      })
    );
    return responses;
  }; //end sendMessage function

  const translate = async (message, sourceLang, targetLanguages) => {
    const translations = await Promise.all(
      // get an array of arrays
      targetLanguages.map(async targetLang => {
        const result = await axios.post("/translate", {
          text: message,
          source: sourceLang,
          target: targetLang
        });
        // return an array of language and translation
        return [targetLang, result.data];
      })
    );

    // convert the array of arrays to an object {"es": "Hola", "ja": "こんにちは"}
    const translationsObject = Object.fromEntries(translations);
    return translationsObject;
  }; //end translate function

  const showContacts = contacts.map((c, index) => {
    return (
      <tr key={index}>
        <td>
          <input
            id={c.id}
            language={c.target_language_code}
            type="checkbox"
            name={c.phone}
            checked={recipients.includes(c.phone)}
            onChange={e => toggleRecipient(e.currentTarget.name)}
          />
        </td>
        <td className="contact-name">
          <label htmlFor={c.id}>
            {c.first_name} {c.last_name}
          </label>
        </td>
        <td className="contact-phone">{c.phone}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <form className="form-container recipient-box" onSubmit={sendMessages}>
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
          <table className="contact-info">
            <tr>
              <th colSpan="2">Name</th>
              <th>Phone number</th>
            </tr>
            {showContacts}
          </table>
          <Link to={`${url}/addcontacts`} className="add-contact-link">
            Add Contacts
          </Link>
        </fieldset>
        <br />
        <input type="submit" value="Send message" />
      </form>
      <Route exact path={`${path}/addcontacts`}>
        <AddContacts />
      </Route>

      {sendMessageResult.length > 0 && (
        <section className="sent-messages-display">
          <h2>Results</h2>
          {sendMessageResult.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </section>
      )}
    </React.Fragment>
  );
};
export default Messages;
