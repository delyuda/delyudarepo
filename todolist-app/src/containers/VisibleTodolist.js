import { connect } from 'react-redux';
import Todolist from '../components/todolist/Todolist';
import { removeItem } from '../actions';

const getVisibleData = (data, filter) => {
    switch (filter) {
        // case 'SHOW_COMPLETED':
        //     return data.filter(t => t.completed);
        // case 'SHOW_ACTIVE':
        //     return data.filter(t => !t.completed);
        case 'SHOW_ALL':
        default:
            return data
    }
};

const mapStateToProps = state => {
    return {
        data: getVisibleData(state.data, 'SHOW_ALL')//state.visibilityFilter)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeItem: id => {
            dispatch(removeItem(id))
        }
    }
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todolist);

export default VisibleTodoList;