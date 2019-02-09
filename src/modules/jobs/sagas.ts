import { takeEvery, put, select } from 'redux-saga/effects';
import * as _ from 'lodash';

import actionTypes from './action-types';
import JobActions from './actions';

import JobsService from '../../services/jobs';

import { getErrorMessage } from '../utils';

function* handleGetJobs(action) {
  yield put(JobActions.setJobsLoadingStatus(true));
  try {
    const jobs = yield JobsService.getJobs();
    yield put(JobActions.setJobs(jobs));
  } catch (err) {
    const errorMsg = getErrorMessage(err);
    yield put(JobActions.getJobsFailure({ errorMsg }));
  }
  yield put(JobActions.setJobsLoadingStatus(false));
}

function* handleUpdateCurrentJob(action) {
  let jobId = action.payload;
  const {
    jobs: { list, current }
  } = yield select() as any;

  if (_.get(current, 'id') == jobId) {
    return;
  }

  let jobObj = list.filter(w => w.id == jobId)[0];

  if (!jobObj) {
    jobObj = yield JobsService.getJob(jobId);
  }

  yield put(JobActions.setCurrentJob(jobObj));
}

export default function* combined() {
  yield takeEvery(actionTypes.GET_JOBS, handleGetJobs);
  yield takeEvery(actionTypes.UPDATE_CURRENT_JOB, handleUpdateCurrentJob);
}
