import { createAsyncAction, ActionType, createAction } from 'typesafe-actions';
import { ErrorType } from '../models/enums';

export const logIn = createAsyncAction('LOG_IN_REQUEST', 'LOG_IN_SUCCESS', 'LOG_IN_FAILURE')<
  { username: string; password: string },
  undefined,
  ErrorType
>();

export const logOut = createAction('LOG_OUT')<undefined>();

const actions = { logIn, logOut };
export type AuthActions = ActionType<typeof actions>;
export default actions;
