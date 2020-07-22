import { createAsyncAction, ActionType } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { Sale } from '../models/sale';

export const getBookSales = createAsyncAction(
  'GET_BOOK_SALES_REQUEST',
  'GET_BOOK_SALES_SUCCESS',
  'GET_BOOK_SALES_FAILURE',
)<{ isbn: number }, { isbn: number; data: Sale[] }, { isbn: number; error: ErrorType }>();

export const sellBook = createAsyncAction(
  'SELL_BOOK_REQUEST',
  'SELL_BOOK_SUCCESS',
  'SELL_BOOK_FAILURE',
)<{ isbn: number }, { isbn: number }, { isbn: number; error: ErrorType }>();

export const unsellBook = createAsyncAction(
  'UNSELL_BOOK_REQUEST',
  'UNSELL_BOOK_SUCCESS',
  'UNSELL_BOOK_FAILURE',
)<
  { isbn: number; date: Date },
  { isbn: number; date: Date },
  { isbn: number; date: Date; error: ErrorType }
>();

const actions = { getBookSales, sellBook, unsellBook };
export type SalesActions = ActionType<typeof actions>;
export default actions;
