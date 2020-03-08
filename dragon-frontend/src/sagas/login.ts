import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { logIn } from '../actions/login';
import { ErrorType } from '../models/enums';

export default function* loginSaga(action: ActionType<typeof logIn.request>) {
  try {
    const { username, password } = action.payload;
    const response = (yield call(fetch, `${process.env.REACT_APP_API_URL}/checkApiKey`, {
      headers: { 'X-Functions-Key': password },
    })) as Response;

    if (response.ok) {
      yield put(logIn.success({ username }));
      // TODO: redirection
    } else if (response.status === 401) {
      yield put(logIn.failure(ErrorType.Unauthorized));
    } else {
      yield put(logIn.failure(ErrorType.ApiError));
    }
  } catch {
    yield put(logIn.failure(ErrorType.ApiError));
  }
}
