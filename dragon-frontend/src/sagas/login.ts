import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { logIn } from '../actions/auth';
import { ErrorType } from '../models/enums';
import { setUserData } from '../helpers/localStorage';

export default function* logInSaga(action: ActionType<typeof logIn.request>) {
  try {
    const { username, password } = action.payload;
    const response = (yield call(fetch, `${process.env.REACT_APP_API_URL}/checkApiKey`, {
      headers: { 'X-Functions-Key': password },
    })) as Response;

    if (response.ok) {
      setUserData(username, password);

      yield put(logIn.success());
      yield put(push('/'));
    } else if (response.status === 401) {
      yield put(logIn.failure(ErrorType.Unauthorized));
    } else {
      yield put(logIn.failure(ErrorType.ApiError));
    }
  } catch {
    yield put(logIn.failure(ErrorType.ApiError));
  }
}
