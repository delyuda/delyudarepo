import React, { Component } from 'react';
import './App.css';

import Dashboard from './containers/Dashboard';
import UserTool from './components/user-tool/UserTool';

class App extends Component {
  constructor (props) {
      super(props);

      this.state = {
        authState: false
      };

      this.changeAuthState = this.changeAuthState.bind(this);
  }

  render() {
    return (
      <div className="App">
          <UserTool authState={this.state.authState} changeAuthState={this.changeAuthState} />
          <Dashboard authState={this.state.authState} changeAuthState={this.changeAuthState} />
      </div>
    );
  }

  changeAuthState () {
    this.setState({
        authState: !this.state.authState
    });
  }
}

export default App;
