import { createAction } from 'redux-actions';

import actionTypes from './action-types';

const getUserInfo = createAction(actionTypes.GET_USER_INFO);
const setUserInfo = createAction(actionTypes.SET_USER_INFO, (user) => user);

const stopLoading = createAction(actionTypes.STOP_LOADING);

export default {
  getUserInfo,
  setUserInfo,
  stopLoading,
};