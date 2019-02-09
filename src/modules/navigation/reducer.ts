import { handleActions } from 'redux-actions';
import actionTypes from './action-types';

const initialState = {
  isExpanded: false,
};

const setExpanded = (state = initialState, action) => ({
  ...state,
  isExpanded: action.payload
});

export default handleActions(
  {
    [actionTypes.SET_EXPANDED]: setExpanded
  },
  initialState
);
