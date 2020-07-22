import { createReducer } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { BookActions, getBook, clearBookError } from '../actions/books';
import { Book } from '../models/book';

export type BooksState = {
  [isbn: number]: {
    isFetching: boolean;
    data?: Book;
    error?: ErrorType;
  };
};

const initialState: BooksState = {};

const reducer = createReducer<BooksState, BookActions>(initialState)
  .handleAction(getBook.request, (state, action) => ({
    ...state,
    [action.payload.isbn]: { isFetching: true, data: undefined, error: undefined },
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
  });

export default reducer;
