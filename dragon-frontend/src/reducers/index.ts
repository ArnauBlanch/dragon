import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import loginReducer from './login';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    login: loginReducer,
  });
export type RootState = StateType<ReturnType<typeof createRootReducer>>;
export default createRootReducer;
