import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { removeUserData } from '../helpers/localStorage';

export default function* logOutSaga() {
  removeUserData();
  yield put(push('/login'));
}
