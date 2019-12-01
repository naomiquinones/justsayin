import React from "react";
import axios from "axios";

const Messages = ({ textToTranslate, handleChange }) => {
  const [message, setMessage] = React.useState("");
  const [contacts, setContacts] = React.useState([]);
  const [recipients, setRecipients] = React.useState([]);
  const [sendMessageResult, setSendMessageResult] = React.useState([]);

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

  // const sendMessages = recipients => {

  //   // send all recipients with their translations to endpoint
  //   for (let recipient of recipients) {
  //     let number = recipient.name;
  //     let msg = recipient.msg;
  //     axios.post("/messages", number, msg);
  //   }
  // };
  const sendMessages = async event => {
    event.preventDefault();
    if (!message || message === "" || message === " ") {
      return alert("Please enter message text");
    }
    // make a list of the recipients' phone numbers
    const group = contacts.filter(c => recipients.includes(c.phone));

    // populate the list of results for messages sent
    // based on what gets returned from the sendMessage fxn
    await setSendMessageResult(sendMessage(message, group));
    console.log("submitted send message requests");
  };

  const sendMessage = async (message, group) => {
    // get list of recipients' unique target languages so we don't send out duplicate translation requests
    const targetLangs = [
      // Set makes a unique set from a given collection
      // Here, map pulls out all the recipients' languages
      ...new Set(group.map(currentContact => currentContact.target_lang_code))
    ];
    console.log("sendMessage targetLangs", targetLangs);

    // get the necessary translations
    const translatedMessages = await translate(
      message,
      sourceLanguage,
      targetLangs
    );
    console.log(
      "\n*-*-sendMessage fxn translatedMessages:",
      translatedMessages,
      "\n*-*-*"
    );
    // match translations with recipients
    const response = await group.map(currentContact => {
      // send a phone number and message to endpoint
      return axios.post("/sendmessage", {
        number: currentContact.phone,
        message: translatedMessages[currentContact.target_lang_code]
      });
    });
    return response;
  };
  //
  const translate = async (message, sourceLang, targetLanguages) => {
    // translations will be in form of {"es": "Hola", "jp": "こんにちは"}

    /**return new Promise((resolve, reject) => {
      Promise.all(targetLanguages.map(targetLang => {
        return axios.post(....);
      })).then(result => {
        // array of the results 
        resolve(result)
      })
    })
    */
    const translations = await Promise.all(
      targetLanguages.map(async targetLang => {
        console.log(
          "\n-*-*-\n\ntranslate.translations.map",
          message,
          sourceLang,
          targetLanguages,
          "\n\n\n"
        );
        const result = await axios.post("/translate", {
          text: message,
          source: sourceLang,
          target: targetLang
        });

        return [targetLang, result.data];
      })
    );

    console.log("TS", translations);

    const translationsObject = Object.fromEntries(translations);

    // const translations = Object.fromEntries(
    //   targetLanguages.map(l => [l, axios.post("/translate", {
        //   text: message,
        //   source: sourceLang,
        //   target: targetLang
        // })]),
    // );
    console.log("Messages translate function",translationsObject)
    return translationsObject;
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
          <span className="contact-name">{c.first_name}</span>
          <span className="contact-phone">{c.phone}</span>
        </label>
        <br />
      </div>
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
          {showContacts}
        </fieldset>
        <br />
        <input type="submit" value="Send message" />
      </form>

      {sendMessageResult.length > 0 && (
        <React.Fragment>
          <hr />
          <h2>Results</h2>
          {sendMessageResult.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Messages;
