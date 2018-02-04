import React from 'react';

class UserTool extends React.Component{
    render () {
        const tool = (this.props.authState) ?
            (
                <div className="user-tool__login">
                    <button className="login-btn" onClick={this.props.changeAuthState}>
                        Logout
                    </button>
                </div>
            ) :
            (
                <div className="user-tool__login">
                    <button className="login-btn" onClick={this.props.changeAuthState}>
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
}

export default UserTool;