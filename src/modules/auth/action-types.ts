import { mapActions } from '../utils';

const actions = [
  'GET_USER_INFO',
  'SET_USER_INFO',
  'STOP_LOADING',
];

export default mapActions(actions, 'AUTH') as any;