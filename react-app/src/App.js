import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/header/Header';


class App extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: 0
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

  render() {
    return (
      <div className="App">
        <Header />

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <input type="text" value={this.state.value * 2} />

          <input type="text" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
