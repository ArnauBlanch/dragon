import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';
import shops from './shopsReducer';

export default combineReducers({
    login,
    user,
    shops
});