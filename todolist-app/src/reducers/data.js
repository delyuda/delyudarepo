import dataMock from '../mock/dataMock';
import moment from 'moment';

const data = (state = dataMock, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                {
                    id: action.id,
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

export default data;