import React, { Component } from 'react';
import './App.css';
import SavedTexts from './components/SavedTexts';
import JustSayInlogo from './JustSayIn-logo-wordmark.svg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <img src={JustSayInlogo} className="JustSayIn-logo" alt="Just Say In" title="Just Say In"/>
          </h1>
        
        </header>
        <SavedTexts />
      </div>
    );
  }
}

export default App;
