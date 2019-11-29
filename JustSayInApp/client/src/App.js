import React /* , { Component } */ from "react";
import { Route, Link } from "react-router-dom";
import JustSayInlogo from "./images/JustSayIn-logo-wordmark.svg";
// import axios from "axios";

// import SavedTexts from './components/SavedTexts';
import Translation from "./components/Translation";

import Messages from "./components/Messages";
const App = () => {
  return (
    <div className="App">
      <header className="page-header">
        <h1>Just Say In</h1>
        <img
          src={JustSayInlogo}
          className="JustSayIn-logo"
          alt="Just Say In"
          title="Just Say In"
        />
        <nav className="page-nav">
          <Link to="/">Translate</Link>
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
