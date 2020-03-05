import { ErrorType } from "../models/enums";
import { createAsyncAction, ActionType } from "typesafe-actions";

export const logIn = createAsyncAction('LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE')<{ username: string, apiKey: string }, undefined, ErrorType>();

const actions = { logIn };
export type LoginActions = ActionType<typeof actions>;
export default actions;