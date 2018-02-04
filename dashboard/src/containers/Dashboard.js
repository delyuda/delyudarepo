import { connect } from 'react-redux';
import GroupList from '../components/group-list/GroupList';

import { loadData, addGroup } from '../actions';

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        loadData: () => {
            dispatch(loadData())
        },

        addGroup: (group) => {
            dispatch(addGroup(group))
        }
    };
};

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupList);

export default Dashboard;