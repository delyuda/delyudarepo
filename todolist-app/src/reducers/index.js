import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import data from './data';
import dataFilter from './dataFilter';

const rootReducer = combineReducers({
    form: formReducer,
    data,
    dataFilter
});

export default rootReducer;