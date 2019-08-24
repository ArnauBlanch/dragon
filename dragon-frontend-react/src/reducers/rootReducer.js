import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';

export default combineReducers({
    login,
    user
});