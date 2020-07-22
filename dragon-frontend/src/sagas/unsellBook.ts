import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getBookSales, unsellBook } from '../actions/sales';
import { ErrorType } from '../models/enums';
import { getApiKey } from '../helpers/localStorage';

export default function* unsellBookSaga(action: ActionType<typeof unsellBook.request>) {
  const { isbn, date } = action.payload;

  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      yield put(unsellBook.failure({ isbn, date, error: ErrorType.Unauthorized }));
      return;
    }

    const response = (yield call(
      fetch,
      `${process.env.REACT_APP_API_URL}/arnau-test/books/${isbn}/sales/${encodeURI(
        date.toISOString(),
      )}`,
      {
        method: 'DELETE',
        headers: { 'X-Functions-Key': apiKey },
      },
    )) as Response;

    if (response.ok) {
      yield put(unsellBook.success({ isbn, date }));
      yield put(getBookSales.request({ isbn }));
    } else if (response.status === 401) {
      yield put(unsellBook.failure({ isbn, date, error: ErrorType.Unauthorized }));
      yield put(push('/login'));
    } else if (response.status === 404) {
      yield put(unsellBook.failure({ isbn, date, error: ErrorType.NotFound }));
    } else {
      yield put(unsellBook.failure({ isbn, date, error: ErrorType.ApiError }));
    }
  } catch {
    yield put(unsellBook.failure({ isbn, date, error: ErrorType.ApiError }));
  }
}
