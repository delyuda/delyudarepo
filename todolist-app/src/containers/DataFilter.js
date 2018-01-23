import { connect } from 'react-redux';
import { setDataFilter } from '../actions';
import Filter from '../components/filter/Filter';

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        filterData: (type, value) => {
            dispatch(setDataFilter(type, value))
        }
    }
};

const DataFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);

export default DataFilter;