const dataFilter = (state = {type: 'SHOW_ALL'}, action) => {
    switch (action.type) {
        case 'SET_DATA_FILTER':
            return action.filter
        default:
            return state
    }
};

export default dataFilter;