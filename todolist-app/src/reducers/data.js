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

        default:
            return state
    }
};

export default data;