
import { handleActions } from 'redux-actions';

import actionTypes from './action-types';

const initialState = {
  list: [],
  filter: {},
  errorMsg: '',
};

const updateUsers = (state=initialState, action) => ({
  ...state,
  list: action.payload.users,
  filter: action.payload.filter,
});

const updateErrorMsg = (state=initialState, action) => ({
  ...state,
  ...action.payload,
});

export default handleActions({
    [actionTypes.SET_USERS_BY_REGION]: updateUsers,
    [actionTypes.GET_USERS_BY_REGION_FAILURE]: updateErrorMsg,
  },
  initialState,
);
