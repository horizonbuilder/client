
import { createAction } from 'redux-actions';

import actionTypes from './action-types';

const getUsersByRegion = createAction(actionTypes.GET_USERS_BY_REGION);
const getUsersByRegionFailure = createAction(actionTypes.GET_USERS_BY_REGION_FAILURE, (errorMsg) => errorMsg);

const setUsersByRegion = createAction(actionTypes.SET_USERS_BY_REGION, ({ users, filter }) => ({ users, filter }));

export default {
  getUsersByRegion,
  getUsersByRegionFailure,
  setUsersByRegion,
};
