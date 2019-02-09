
import { mapActions } from '../utils';

const actions = [
  'GET_USERS_BY_REGION',
  'GET_USERS_BY_REGION_FAILURE',
  'SET_USERS_BY_REGION',
];

export default mapActions(actions, 'USERS') as any;
