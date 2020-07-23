/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createReducer } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { BookActions, getBook, clearBookError } from '../actions/books';
import { Book } from '../models/book';
import { SalesActions, sellBook, unsellBook } from '../actions/sales';

export type BooksState = {
  [isbn: number]: {
    isFetching: boolean;
    data?: Book;
    sold?: boolean;
    error?: ErrorType;
  };
};

const initialState: BooksState = {};

const reducer = createReducer<BooksState, BookActions | SalesActions>(initialState)
  .handleAction(getBook.request, (state, action) => ({
    ...state,
    [action.payload.isbn]: {
      ...state[action.payload.isbn],
      isFetching: true,
      error: undefined,
      sold: undefined,
    },
  }))
  .handleAction(getBook.success, (state, action) => ({
    ...state,
    [action.payload.isbn]: { isFetching: false, data: action.payload, error: undefined },
  }))
  .handleAction(getBook.failure, (state, action) => ({
    ...state,
    [action.payload.isbn]: { isFetching: false, data: undefined, error: action.payload.error },
  }))
  .handleAction(clearBookError, (state, action) => {
    if (state[action.payload.isbn]) return state;
    return { ...state, [action.payload.isbn]: { ...state[action.payload.isbn], error: undefined } };
  })
  .handleAction(sellBook.success, (state, action) => {
    if (!state[action.payload.isbn] || !state[action.payload.isbn].data) return state;
    const { availableCopies } = state[action.payload.isbn].data!;
    return {
      ...state,
      [action.payload.isbn]: {
        ...state[action.payload.isbn],
        data: { ...state[action.payload.isbn].data!, availableCopies: availableCopies - 1 },
        sold: true,
      },
    };
  })
  .handleAction(unsellBook.success, (state, action) => {
    if (!state[action.payload.isbn] || !state[action.payload.isbn].data) return state;
    const { availableCopies } = state[action.payload.isbn].data!;
    return {
      ...state,
      [action.payload.isbn]: {
        ...state[action.payload.isbn],
        data: { ...state[action.payload.isbn].data!, availableCopies: availableCopies + 1 },
      },
    };
  });

export default reducer;
