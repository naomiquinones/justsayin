import React, { Component } from 'react';
import './App.css';
import JustSayInlogo from './JustSayIn-logo-wordmark.svg'
// import SavedTexts from './components/SavedTexts';
import FormContainer from './components/FormContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="page-header">
          <h1>
            <img src={JustSayInlogo} className="JustSayIn-logo" alt="Just Say In" title="Just Say In"/>
          </h1>        
        </header>
        <main>
          {/* <SavedTexts /> */}
          <FormContainer />
        </main>
        <footer className="page-footer">
          Copyright &copy; 2019 Naomi Quiñones
        </footer>
      </div>
    );
  }
}

export default App;
