import React, { Component } from 'react';
import axios from 'axios';

class SavedTexts extends Component {
  constructor() {
    super();
    this.state = {
      savedText: []
    }
  }

  componentDidMount() {
    axios.get('/api/test')
      .then(response => {
        this.setState({savedText:response.data}, () => console.log('Text fetched...', response.data));
      })
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
