import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
