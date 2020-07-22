import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getBookSales } from '../actions/sales';
import { ErrorType } from '../models/enums';
import { getApiKey } from '../helpers/localStorage';
import { Sale } from '../models/sale';

export default function* getBookSalesSaga(action: ActionType<typeof getBookSales.request>) {
  const { isbn } = action.payload;

  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      yield put(getBookSales.failure({ isbn, error: ErrorType.Unauthorized }));
      return;
    }

    const response = (yield call(
      fetch,
      `${process.env.REACT_APP_API_URL}/arnau-test/books/${isbn}/sales`,
      {
        headers: { 'X-Functions-Key': apiKey },
      },
    )) as Response;

    if (response.ok) {
      const data = (yield response.json()) as Sale[];
      yield put(getBookSales.success({ isbn, data }));
    } else if (response.status === 401) {
      yield put(getBookSales.failure({ isbn, error: ErrorType.Unauthorized }));
      yield put(push('/login'));
    } else if (response.status === 404) {
      yield put(getBookSales.failure({ isbn, error: ErrorType.NotFound }));
    } else {
      yield put(getBookSales.failure({ isbn, error: ErrorType.ApiError }));
    }
  } catch {
    yield put(getBookSales.failure({ isbn, error: ErrorType.ApiError }));
  }
}
