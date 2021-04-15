import React from 'react';

import './App.css';

import Header from '../Header/Header.js';
import Builder from '../Builder/Builder.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header logo="CV BUILDER" />
        <Builder />
      </div>
    );
  }
}

export default App;
