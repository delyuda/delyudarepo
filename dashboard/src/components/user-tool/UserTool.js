import React from 'react';
import './UserTool.css';

class UserTool extends React.Component{
    constructor (props) {
        super(props);

        this.logoutHandler = this.logoutHandler.bind(this);
    }

    render () {
        const tool = (this.props.authState) ?
            (
                <div className="user-tool__login">
                    <div className="user-info">
                        Hello,
                        <span className="user-info__name">
                            {this.props.userName}
                        </span>
                        !
                    </div>
                    <button className="btn btn-warning" onClick={this.logoutHandler}>
                        Logout
                    </button>
                </div>
            ) :
            (
                <div className="user-tool__login">
                    <button className="btn btn-success" onClick={this.props.openLoginModal}>
                        Login
                    </button>
                </div>
            );

        return (
            <div className="user-tool">
                {tool}
            </div>
        );
    }

    logoutHandler () {
        this.props.logout();
        this.props.changeAuthState({authState: false})
    }
}

export default UserTool;