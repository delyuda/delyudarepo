import { combineReducers } from 'redux';
import data from './data';
import auth from './auth';


const rootReducer = combineReducers({
    data,
    auth
});

export default rootReducer;