import { createAction } from 'redux-actions';

import actionTypes from './action-types';

const getJobs = createAction(actionTypes.GET_JOBS);

const getJobsFailure = createAction(actionTypes.GET_JOBS_FAILURE);

const setJobs = createAction(actionTypes.SET_JOBS);

const updateCurrentJob = createAction(actionTypes.UPDATE_CURRENT_JOB);

const setCurrentJob = createAction(actionTypes.SET_CURRENT_JOB);

const setJobsLoadingStatus = createAction(actionTypes.SET_JOBS_LOADING_STATUS);

export default {
  getJobs,
  getJobsFailure,
  setJobs,
  setCurrentJob,
  updateCurrentJob,
  setJobsLoadingStatus
};
