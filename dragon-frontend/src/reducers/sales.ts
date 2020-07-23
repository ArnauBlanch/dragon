import { createReducer } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { SalesActions, getBookSales, sellBook, unsellBook } from '../actions/sales';
import { Sale } from '../models/sale';

export type SalesState = {
  [isbn: number]: {
    isFetching: boolean;
    data?: Sale[];
    error?: ErrorType;
    isSelling?: boolean;
    sold?: boolean;
    sellError?: ErrorType;
  };
};

const initialState: SalesState = {};

const reducer = createReducer<SalesState, SalesActions>(initialState)
  .handleAction(getBookSales.request, (state, action) => ({
    ...state,
    [action.payload.isbn]: { isFetching: true, data: undefined, error: undefined },
  }))
  .handleAction(getBookSales.success, (state, action) => ({
    ...state,
    [action.payload.isbn]: { isFetching: false, data: action.payload.data, error: undefined },
  }))
  .handleAction(getBookSales.failure, (state, action) => ({
    ...state,
    [action.payload.isbn]: { isFetching: false, data: undefined, error: action.payload.error },
  }))
  .handleAction(sellBook.request, (state, action) => ({
    ...state,
    [action.payload.isbn]: { ...state[action.payload.isbn], isSelling: true, sellError: undefined },
  }))
  .handleAction(sellBook.success, (state, action) => ({
    ...state,
    [action.payload.isbn]: {
      ...state[action.payload.isbn],
      isSelling: false,
      sellError: undefined,
    },
  }))
  .handleAction(sellBook.failure, (state, action) => ({
    ...state,
    [action.payload.isbn]: {
      ...state[action.payload.isbn],
      isSelling: false,
      sellError: action.payload.error,
    },
  }))
  .handleAction(unsellBook.request, (state, action) => ({
    ...state,
    [action.payload.isbn]: { ...state[action.payload.isbn], isFetching: true },
  }))
  .handleAction(unsellBook.failure, (state, action) => ({
    ...state,
    [action.payload.isbn]: {
      ...state[action.payload.isbn],
      isFetching: false,
      error: action.payload.error,
    },
  }));

export default reducer;
