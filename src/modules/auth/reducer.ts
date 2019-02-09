import { handleActions } from 'redux-actions';

import actionTypes from './action-types';

// TODO: refactor in a better way
const initialState = {
  user: null,
  loading: true,
};

const startLoading = (state=initialState, action) => ({
  ...state,
  loading: true
});

const stopLoading = (state=initialState, action) => ({
  ...state,
  loading: false,
});

const updateUser = (state=initialState, action) => ({
  ...state,
  user: {
    ...state.user,
    ...action.payload,
  },
  loading: false,
});

export default handleActions({
    [actionTypes.GET_USER_INFO]: startLoading,
    [actionTypes.STOP_LOADING]: stopLoading,
    [actionTypes.SET_USER_INFO]: updateUser,
  },
  initialState,
);