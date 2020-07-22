import { createReducer } from 'typesafe-actions';
import { ErrorType } from '../models/enums';
import { SalesActions, getBookSales } from '../actions/sales';
import { Sale } from '../models/sale';

export type SalesState = {
  [isbn: number]: {
    isFetching: boolean;
    data?: Sale[];
    error?: ErrorType;
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
  }));

export default reducer;
