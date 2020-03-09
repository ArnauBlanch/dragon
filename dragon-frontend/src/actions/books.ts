import { createAsyncAction, ActionType } from 'typesafe-actions';
import { ErrorType } from '../models/enums';

export const getBook = createAsyncAction(
  'GET_BOOK_REQUEST',
  'GET_BOOK_SUCCESS',
  'GET_BOOK_FAILURE',
)<{ isbn: number }, undefined, undefined>();

const actions = { getBook };
export type BookActions = ActionType<typeof actions>;
export default actions;
