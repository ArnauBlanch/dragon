import { ActionType } from 'typesafe-actions';
import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { logIn } from '../actions/auth';
import { ErrorType } from '../models/enums';
import { removeUserData } from '../helpers/localStorage';

export default function logOutSaga() {
  removeUserData();
}
