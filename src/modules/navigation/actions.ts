import { createAction } from 'redux-actions';
import actionTypes from './action-types';

const setExpanded = createAction<boolean>(actionTypes.SET_EXPANDED);

export default {
  setExpanded
};
