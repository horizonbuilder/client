import { handleActions } from 'redux-actions';

import actionTypes from './action-types';

const initialState = {
  list: [],
  current: null,
  errorMsg: '',
  isLoading: false
};

const updateJobs = (state = initialState, action) => ({
  ...state,
  list: action.payload
});

const setCurrentJob = (state = initialState, action) => ({
  ...state,
  current: action.payload
});

const updateErrorMsg = (state = initialState, action) => ({
  ...state,
  ...action.payload
});

const setJobsLoadingStatus = (state = initialState, action) => ({
  ...state,
  isLoading: action.payload
});

export default handleActions(
  {
    [actionTypes.SET_JOBS]: updateJobs,
    [actionTypes.GET_JOBS_FAILURE]: updateErrorMsg,
    [actionTypes.SET_CURRENT_JOB]: setCurrentJob,
    [actionTypes.SET_JOBS_LOADING_STATUS]: setJobsLoadingStatus
  },
  initialState
);
