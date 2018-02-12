import { connect } from 'react-redux';
import UserTool from '../components/user-tool/UserTool';

import { logout } from '../actions/';

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        logout: (params) => {
            dispatch(logout(params));
        }
    }
};

const UserToolBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTool);

export default UserToolBar;