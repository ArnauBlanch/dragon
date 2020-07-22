import { takeEvery } from 'redux-saga/effects';
import logInSaga from './logIn';
import logOutSaga from './logOut';
import getBookSaga from './getBook';
import { logIn, logOut } from '../actions/auth';
import { getBook } from '../actions/books';

export default function* rootSaga() {
  yield takeEvery(logIn.request, logInSaga);
  yield takeEvery(logOut, logOutSaga);
  yield takeEvery(getBook.request, getBookSaga);
}
