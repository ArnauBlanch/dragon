import { createAsyncAction, ActionType, createAction } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { Book } from '../models/book';

export const getBook = createAsyncAction(
  'GET_BOOK_REQUEST',
  'GET_BOOK_SUCCESS',
  'GET_BOOK_FAILURE',
)<{ isbn: number }, Book, { isbn: number; error: ErrorType }>();

export const clearBookError = createAction('CLEAR_BOOK_ERROR')<{ isbn: number }>();

const actions = { getBook, clearBookError };
export type BookActions = ActionType<typeof actions>;
export default actions;
