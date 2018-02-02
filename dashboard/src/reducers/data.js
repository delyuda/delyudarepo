const defaultState = { loading: false, data: [], errors: null };

function data (state = defaultState, action) {
    switch (action.type) {

        case 'LOAD_DATA_REQUESTED':
            return { loading: true, data: [] };

        case 'LOAD_DATA_OK':
            return { loading: false, data: action.data, errors: null };

        case 'LOAD_DATA_FAIL':
            return { loading: false, data: [], errors: action.errors };

        default:
            return state;
    }
}

export default data;