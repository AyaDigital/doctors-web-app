import { takeLatest, delay } from 'redux-saga/effects';
import { LOG_IN_ACTION_SUCCESS } from './actions/logIn';

function* logInAction({ data }) {
    yield delay(3000);
    console.log('LOG_IN_ACTION_SUCCESS', data);
  }

export default function* root() {
    yield takeLatest(LOG_IN_ACTION_SUCCESS, logInAction);
  }