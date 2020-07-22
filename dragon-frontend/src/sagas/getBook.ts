import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getBook } from '../actions/books';
import { ErrorType } from '../models/enums';
import { getApiKey } from '../helpers/localStorage';
import { Book } from '../models/book';

export default function* getBookSaga(action: ActionType<typeof getBook.request>) {
  const { isbn } = action.payload;

  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      yield put(getBook.failure({ isbn, error: ErrorType.Unauthorized }));
      return;
    }

    const response = (yield call(
      fetch,
      `${process.env.REACT_APP_API_URL}/arnau-test/books/${isbn}`,
      {
        headers: { 'X-Functions-Key': apiKey },
      },
    )) as Response;

    if (response.ok) {
      const book = (yield response.json()) as Book;
      yield put(getBook.success(book));
    } else if (response.status === 401) {
      yield put(getBook.failure({ isbn, error: ErrorType.Unauthorized }));
      yield put(push('/login'));
    } else if (response.status === 404) {
      yield put(getBook.failure({ isbn, error: ErrorType.NotFound }));
    } else {
      yield put(getBook.failure({ isbn, error: ErrorType.ApiError }));
    }
  } catch {
    yield put(getBook.failure({ isbn, error: ErrorType.ApiError }));
  }
}
