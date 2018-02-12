import { connect } from 'react-redux';
import LoginModal from '../components/login-modal/LoginModal';

import { login } from '../actions/';

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        login: (params) => {
            dispatch(login(params));
        }
    }
};

const LoginPopup = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);

export default LoginPopup;