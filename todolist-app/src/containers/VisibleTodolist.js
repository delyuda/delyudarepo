import { connect } from 'react-redux';
import Todolist from '../components/todolist/Todolist';
import { removeItem } from '../actions';

const getVisibleData = (data, filter) => {
    switch (filter.type) {
        case 'title':
            return data.filter(item => (item.title.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1));
        case 'date':
            return data.filter(item => (item.created_at.indexOf(filter.value) !== -1));
        case 'SHOW_ALL':
        default:
            return data
    }
};

const mapStateToProps = state => {
    return {
        data: getVisibleData(state.data, state.dataFilter)
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