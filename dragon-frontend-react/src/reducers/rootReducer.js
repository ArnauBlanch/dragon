import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';
import shops from './shopsReducer';
import books from './booksReducer';

export default combineReducers({
    login,
    user,
    shops,
    books
});