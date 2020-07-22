import { createAsyncAction, ActionType } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { Sale } from '../models/sale';

export const getBookSales = createAsyncAction(
  'GET_BOOK_SALES_REQUEST',
  'GET_BOOK_SALES_SUCCESS',
  'GET_BOOK_SALES_FAILURE',
)<{ isbn: number }, { isbn: number; data: Sale[] }, { isbn: number; error: ErrorType }>();

const actions = { getBookSales };
export type SalesActions = ActionType<typeof actions>;
export default actions;
