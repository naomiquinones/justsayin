import React, { Component } from 'react';

class SavedTexts extends Component {
  constructor() {
    super();
    this.state = {
      savedText: []
    }
  }

  componentDidMount() {
    fetch('/api/test')
      .then(res => res.json())
      .then(text => this.setState({text}, () => console.log('Text fetched...', text)));
  }
  render() {
    return (
      <div>
        <h2>Saved Text</h2>
        <ul>
          {this.state.savedText.map(text => 
            <li key={text.id}>Source text:{ text.sourceText }, Translated: { text.translatedText }</li>
          )}
        </ul>
      </div>
    );
  }
}

export default SavedTexts;
