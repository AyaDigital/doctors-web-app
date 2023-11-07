import { put, take, takeLatest } from 'redux-saga/effects';
import { hideLoaderAction, showLoaderAction, SHOW_LOADER_ACTION } from './actions/loaderActions';

function* loaderListener({ type: actionName }) {
  yield put(showLoaderAction());

  // Wait until an action is dispatched with the same type
  yield take(({ type, action }) => action && type.includes(actionName));
  yield put(hideLoaderAction());
}

export default function* root() {
  yield takeLatest(SHOW_LOADER_ACTION, loaderListener);
}