import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from './auth';
import booksReducer from './books';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    books: booksReducer,
  });
export type RootState = StateType<ReturnType<typeof createRootReducer>>;
export default createRootReducer;
