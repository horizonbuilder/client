import { takeEvery, put } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import ActionTypes from './action-types';
import AuthActions from './actions';

import AuthService from '../../services/auth';

function* handleGetUserInfo() {
  const user = yield AuthService.getUserInfo();

  if (isEmpty(user)) {
    yield put(AuthActions.stopLoading());
  } else {
    yield put(AuthActions.setUserInfo(user));
  }
}

export default function* combined() {
  yield takeEvery(ActionTypes.GET_USER_INFO, handleGetUserInfo);
}
