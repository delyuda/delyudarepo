import React from 'react';
import Modal from 'react-modal';
import './LoginModal.css';

class LoginModal extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.emailInputChange = this.emailInputChange.bind(this);
        this.passwordInputChange = this.passwordInputChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.authorized = this.authorized.bind(this);
    }

    emailInputChange (e) {
        this.setState({
            email: e.target.value
        });
    }

    passwordInputChange (e) {
        this.setState({
            password: e.target.value
        });
    }

    render () {
        return (
            <Modal appElement={document.getElementById('root')}
                   isOpen={this.props.isOpen}
                   onRequestClose={this.props.close}
                   style={{
                       content: {
                           width: '400px',
                           height: '330px',
                           margin: 'auto auto',
                           padding: '10px'
                       }
                   }}>
                {
                    (this.props.auth.loading) ?
                        <div className="loading">
                            <div className="loading__message">Wait...</div>
                            <span className="glyphicon glyphicon-send loading__icon"></span>
                        </div>
                        :
                        <div>
                            <div className="login-title">
                                Authorization
                            </div>
                            {
                                (!this.props.auth.authState && this.props.auth.isResponse) ?
                                    <div className="wrong-message">
                                        Wrong data.
                                    </div>
                                    : ''
                            }
                            <div className="form-group">
                                <label>E-mail:</label>
                                <input type="text" className="form-control"
                                       value={this.state.email}
                                       onChange={this.emailInputChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="text" className="form-control"
                                       value={this.state.password}
                                       onChange={this.passwordInputChange} />
                            </div>
                            <div className="login-info">
                                Для авторизации логин: batman@gmail.com <br/>
                                пароль: batman
                            </div>
                            <button onClick={this.loginHandler} className="btn btn-success">
                                Login
                            </button>
                            <button onClick={this.props.close} className="btn btn-default cancel-btn">
                                Close
                            </button>
                        </div>
                }
            </Modal>
        );
    }

    componentDidUpdate () {
        if (this.props.auth.isResponse && this.props.auth.authState) {
            this.authorized();
        }
    }

    loginHandler () {
        this.props.login({
            email: this.state.email,
            password: this.state.password
        });
    }

    authorized () {
        this.props.changeAuthState({
            authState: this.props.auth.authState,
            userName: this.props.auth.userName,
        });

        this.props.close();
    }
}

export default LoginModal;