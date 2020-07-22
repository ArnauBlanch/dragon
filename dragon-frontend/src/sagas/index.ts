import { takeEvery } from 'redux-saga/effects';
import logInSaga from './logIn';
import logOutSaga from './logOut';
import getBookSaga from './getBook';
import { logIn, logOut } from '../actions/auth';
import { getBook } from '../actions/books';
import { getBookSales, sellBook, unsellBook } from '../actions/sales';
import getBookSalesSaga from './getBookSales';
import sellBookSaga from './sellBook';
import unsellBookSaga from './unsellBook';

export default function* rootSaga() {
  yield takeEvery(logIn.request, logInSaga);
  yield takeEvery(logOut, logOutSaga);
  yield takeEvery(getBook.request, getBookSaga);
  yield takeEvery(getBookSales.request, getBookSalesSaga);
  yield takeEvery(sellBook.request, sellBookSaga);
  yield takeEvery(unsellBook.request, unsellBookSaga);
}
