import React from 'react';
import Modal from 'react-modal';

class LoginModal extends React.Component{
    render () {
        return (
            <Modal appElement={document.getElementById('root')}
                   isOpen={this.props.isOpen}>
                <button onClick={this.props.login}>Login</button>
            </Modal>
        );
    }
}

export default LoginModal;