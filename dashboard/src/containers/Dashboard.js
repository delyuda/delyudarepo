import { connect } from 'react-redux';
import GroupList from '../components/group-list/GroupList';

const mapStateToProps = state => {
    console.log('state',state);
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupList);

export default Dashboard;