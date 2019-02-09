import { combineReducers } from 'redux';

import Auth from './auth';
import Users from './users';
import Jobs from './jobs';
import Navigation from './navigation';

export default combineReducers({
  auth: Auth.Reducer,
  users: Users.Reducer,
  jobs: Jobs.Reducer,
  navigation: Navigation.Reducer
});
