import { createAsyncAction, ActionType } from 'typesafe-actions';
import { ErrorType } from '../models/enums';

export const logIn = createAsyncAction('LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE')<
  { username: string; password: string },
  undefined,
  ErrorType
>();

const actions = { logIn };
export type LoginActions = ActionType<typeof actions>;
export default actions;
