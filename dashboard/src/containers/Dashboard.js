import { connect } from 'react-redux';
import GroupList from '../components/group-list/GroupList';

import { loadData, addGroup, removeGroup, addTask, removeTask } from '../actions';

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
        },

        removeGroup: id => {
            dispatch(removeGroup(id))
        },

        addTask: (task) => {
            dispatch(addTask(task))
        },

        removeTask: (id) => {
            dispatch(removeTask(id))
        }
    };
};

const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupList);

export default Dashboard;