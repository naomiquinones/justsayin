import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import axios from "axios";

import Loading from "./Loading";

const AddContactsForm = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [goBack, setGoBack] = React.useState(false);
  const [availableLanguages, setAvailableLanguages] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [targetLanguage, setTargetLanguage] = React.useState("");

  React.useEffect(() => {
    fetchLanguages();
  });

  const fetchLanguages = async () => {
    if (availableLanguages.length < 80) {
      let response = await axios.get("/languages");

      let languages = response.data;

      let langsArray = [];
      for (var i = 0; i < languages.length; i++) {
        const codeAndName = Object.values(languages[i]);
        langsArray.push(codeAndName);
      }
      setAvailableLanguages(langsArray);
      setIsLoading(false);
    }
  };

  const handleAddRequest = async event => {
    event.preventDefault();

    // change the owner_id to pull from the logged-in user
    const owner_id = 1;

    // minimal validation, if these three, can send to db
    if (firstName && phone && targetLanguage) {
      console.log("have three, can send", firstName, phone, targetLanguage);
      await axios.post("/contacts", {
        owner_id: owner_id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        target_lang_code: targetLanguage
      });
      setGoBack(true);
    }
  };

  const languageOptions = availableLanguages.map(language => {
    return (
      <option key={language[0]} value={language[0]}>
        {language[1]}
      </option>
    );
  });

  return (
    <React.Fragment>
      {goBack && <Redirect to="/messages" />}
      {isLoading ? (
        <Loading message="Getting available languages" />
      ) : (
        <form
          className="form-container add-contact-box"
          onSubmit={handleAddRequest}
        >
          <fieldset>
            <legend>Add Contacts</legend>
            <label htmlFor="fname">
              First name: <span className="notice">(required)</span>
            </label>
            <input
              id="fname"
              name="fname"
              type="text"
              required
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />

            <label htmlFor="lname">Last name:</label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />

            <label htmlFor="email">Email address:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <label htmlFor="phone">
              Phone number: <span className="notice">(required)</span>
            </label>
            <input
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />

            <br />
            <label htmlFor="languages-list">
              Set the contact's target language{" "}
              <span className="notice">(required)</span>
            </label>
            <select
              required
              className="language-list add-contact select-container"
              id="languages-list"
              value={targetLanguage}
              onChange={e => {
                const selectedLang = Array.apply(null, e.currentTarget.options)
                  .filter(opt => opt.selected)
                  .map(opt => opt.value);
                setTargetLanguage(selectedLang[0]);
              }}
            >
              {languageOptions}
            </select>
          </fieldset>
          <input type="submit" value="Add contact" />
        </form>
      )}
    </React.Fragment>
  );
};
export default withRouter(AddContactsForm);
