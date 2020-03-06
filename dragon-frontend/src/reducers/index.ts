import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import loginReducer from './login';

const rootReducer = { login: loginReducer };
export type RootState = StateType<typeof rootReducer>;
export default combineReducers(rootReducer);
