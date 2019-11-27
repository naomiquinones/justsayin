import React /* , { Component } */ from "react";
import { Route, Link } from "react-router-dom";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
// import axios from "axios";

// import SavedTexts from './components/SavedTexts';
import Translation from "./components/Translation";

import Messages from "./components/Messages";
const App = () => {
  // const sendMessages = recipients => {
  //   // get list of unique recipients' target languages

  //   // get the necessary translations

  //   // match translations with recipients

  //   // send all recipients with their translations to endpoint
  //   for (let recipient of recipients) {
  //     let number = recipient.name;
  //     let msg = recipient.msg;
  //     axios.post("/messages", number, msg);
  //   }
  // };

  return (
    <div className="App">
      <header className="page-header">
        <h1>
          <img
            src={JustSayInlogo}
            className="JustSayIn-logo"
            alt="Just Say In"
            title="Just Say In"
          />
        </h1>
        <nav className="page-nav">
          <Link to="/">Home</Link>
          <Link to="/messages">Messages</Link>
        </nav>
      </header>
      <main>
        <Route exact path="/">
          <Translation />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
      </main>
      <footer className="page-footer">
        Copyright &copy; 2019 Naomi Quiñones
      </footer>
    </div>
  );
};
export default App;
