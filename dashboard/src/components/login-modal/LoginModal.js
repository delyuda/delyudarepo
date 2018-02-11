import React from 'react';
import Modal from 'react-modal';
import './LoginModal.css';

class LoginModal extends React.Component{
    render () {
        return (
            <Modal appElement={document.getElementById('root')}
                   isOpen={this.props.isOpen}
                   onRequestClose={this.props.close}
                   style={{
                       content: {
                           width: '200px',
                           height: '120px',
                           margin: 'auto auto',
                           padding: '40px 10px 0'
                       }
                   }}>
                <button onClick={this.props.login} className="btn btn-success">
                    Login
                </button>
                <button onClick={this.props.close} className="btn btn-default cancel-btn">
                    Close
                </button>
            </Modal>
        );
    }
}

export default LoginModal;