import dataMock from '../mock/dataMock';
import moment from 'moment';

const data = (state = dataMock, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            let id = calculateId(state);
            return [
                ...state,
                {
                    id: id,
                    title: action.title,
                    description: action.description,
                    created_at: action.created_at || moment().format('YYYY-DD-MM')
                }
            ];

        case 'REMOVE_ITEM':
            return state.filter(item =>
                (item.id !== action.id)
            );

        default:
            return state
    }
};

function calculateId (state) {
    return state.reduce( (maxId, item) =>
        (item.id > maxId) ? item.id : maxId, 0) + 1;
}

export default data;