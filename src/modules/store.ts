import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import sagas from './sagas';

const env = process.env.NODE_ENV;

const sagaMiddleware = createSagaMiddleware();

const middlewareArr = [sagaMiddleware];

const middleware = applyMiddleware(...middlewareArr);

const store = createStore(
  reducer,
  env === 'development' ? composeWithDevTools(middleware) : middleware
);

sagaMiddleware.run(sagas);

export default store;
