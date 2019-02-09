import { mapActions } from '../utils';

const actions = [
  'GET_JOBS',
  'GET_JOBS_FAILURE',
  'SET_JOBS',
  'UPDATE_CURRENT_JOB',
  'SET_CURRENT_JOB',
  'SET_JOBS_LOADING_STATUS'
];

export default mapActions(actions, 'JOBS') as any;
