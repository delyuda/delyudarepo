import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="header">
                <div className="header__title">
                    Welcome to Hello World!
                </div>
                <div className="header__subtitle">
                    This is test react application
                </div>
            </div>
        )
    }
}

export default Header;