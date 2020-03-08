import { takeEvery } from 'redux-saga/effects';
import loginSaga from './login';
import { logIn } from '../actions/login';

export default function* rootSaga() {
  yield takeEvery(logIn.request, loginSaga);
}
