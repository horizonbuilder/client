
import { takeEvery, put, select } from 'redux-saga/effects';

import actionTypes from './action-types';
import UserActions from './actions';

import usersService from '../../services/users';

import { getErrorMessage } from '../utils';

function* handleGetUsersByRegion(action) {
  try {
    const { auth: { user } } = yield select() as any;
    const { region_id } = user;

    const users = yield usersService.getUsersByRegion(region_id);
    
    const filter = { region_id };
    yield put(UserActions.setUsersByRegion({ users, filter }));
  } catch (err) {
    const errorMsg = getErrorMessage(err);

    yield put(UserActions.getUsersByRegionFailure({ errorMsg }));
  };
};

export default function* combined() {
  yield takeEvery(actionTypes.GET_USERS_BY_REGION, handleGetUsersByRegion);
};
