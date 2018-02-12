import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

import Dashboard from './containers/Dashboard';
import LoginPopup from './containers/LoginPopup';
import UserToolBar from './containers/UserToolBar';

class App extends Component {
  constructor (props) {
      super(props);

      this.state = {
        authState: false,
        userName: '',
        isLoginModalOpen: false
      };

      this.changeAuthState = this.changeAuthState.bind(this);
      this.openLoginModal = this.openLoginModal.bind(this);
      this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  render() {
    return (
      <div className="App">
          <UserToolBar authState={this.state.authState}
                    userName={this.state.userName}
                    openLoginModal={this.openLoginModal}
                    closeLoginModal={this.closeLoginModal}
                    changeAuthState={this.changeAuthState} />
          <Dashboard authState={this.state.authState}
                     openLoginModal={this.openLoginModal}
                     changeAuthState={this.changeAuthState} />
          <LoginPopup isOpen={this.state.isLoginModalOpen}
                    changeAuthState={this.changeAuthState}
                    close={this.closeLoginModal}/>
      </div>
    );
  }

  changeAuthState ({authState, userName}) {
    this.setState({
        authState: authState,
        userName: userName || ''
    });
  }

    openLoginModal () {
        this.setState({
            isLoginModalOpen: true
        })
    }

    closeLoginModal () {
        this.setState({
            isLoginModalOpen: false
        })
    }
}

export default App;
