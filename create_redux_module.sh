#!/bin/bash

action_types="
import { mapActions } from '../utils';

const actions = [
];

export default mapActions(actions, '') as any;"

actions="
import { createAction } from 'redux-actions';

import actionTypes from './action-types';

export default {

};"

reducer="
import { handleActions } from 'redux-actions';

import actionTypes from './action-types';

const initialState = {

};

export default handleActions({

  },
  initialState,
);"

sagas="
import { takeEvery, put } from 'redux-saga/effects';

import actionTypes from './action-types';

export default function* combined() {

};"

index="
import ActionTypes from './action-types';
import Actions from './actions';
import Reducer from './reducer';
import Sagas from './sagas';

export default { ActionTypes, Actions, Reducer, Sagas };"

echo "Creating module $1"
mkdir ./src/modules/$1
printf '%s\n' "$action_types" >> ./src/modules/$1/action-types.ts
printf '%s\n' "$actions" >> ./src/modules/$1/actions.ts
printf '%s\n' "$index" >> ./src/modules/$1/index.ts
printf '%s\n' "$reducer" >> ./src/modules/$1/reducer.ts
printf '%s\n' "$sagas" >> ./src/modules/$1/sagas.ts
echo "Module $1 created"