import React, { Component } from 'react';
import './App.css';
import SavedTexts from './components/SavedTexts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Just Say In
          </h1>
        
        </header>
        <SavedTexts />
      </div>
    );
  }
}

export default App;
