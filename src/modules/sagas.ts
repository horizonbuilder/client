import { all, fork } from 'redux-saga/effects';

import Auth from './auth';
import Users from './users';
import Jobs from './jobs';

export default function* sagas() {
  try {
    yield all([fork(Auth.Sagas), fork(Users.Sagas), fork(Jobs.Sagas)]);
  } catch (err) {
    console.error(err);
  }
}
