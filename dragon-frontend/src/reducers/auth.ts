import { createReducer } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { AuthActions, logIn } from '../actions/auth';
import { User } from '../models/auth';

export type AuthState = {
  isFetching: boolean;
  success: boolean;
  error?: ErrorType;
};

const initialState: AuthState = {
  isFetching: false,
  success: false,
};

const reducer = createReducer<AuthState, AuthActions>(initialState)
  .handleAction(logIn.request, (state) => ({
    ...state,
    isFetching: true,
    success: false,
    error: undefined,
  }))
  .handleAction(logIn.success, (state) => ({ ...state, isFetching: false, success: true }))
  .handleAction(logIn.failure, (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }));

export default reducer;
