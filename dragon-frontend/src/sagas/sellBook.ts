import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getBookSales, sellBook } from '../actions/sales';
import { ErrorType } from '../models/enums';
import { getApiKey, getUserName } from '../helpers/localStorage';

export default function* sellBookSaga(action: ActionType<typeof sellBook.request>) {
  const { isbn } = action.payload;

  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      yield put(sellBook.failure({ isbn, error: ErrorType.Unauthorized }));
      return;
    }

    const response = (yield call(
      fetch,
      `${process.env.REACT_APP_API_URL}/arnau-test/books/${isbn}/sales?seller=${encodeURI(
        getUserName() || '',
      )}`,
      {
        method: 'POST',
        headers: { 'X-Functions-Key': apiKey },
      },
    )) as Response;

    if (response.ok) {
      yield put(sellBook.success({ isbn }));
      yield put(getBookSales.request({ isbn }));
    } else if (response.status === 401) {
      yield put(sellBook.failure({ isbn, error: ErrorType.Unauthorized }));
      yield put(push('/login'));
    } else if (response.status === 404) {
      yield put(sellBook.failure({ isbn, error: ErrorType.NotFound }));
    } else {
      yield put(sellBook.failure({ isbn, error: ErrorType.ApiError }));
    }
  } catch {
    yield put(sellBook.failure({ isbn, error: ErrorType.ApiError }));
  }
}
