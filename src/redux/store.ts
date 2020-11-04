import { createStore, applyMiddleware } from 'redux';
import { RootAction, RootState } from 'typesafe-actions';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './rootReducer';
import rootEpic from './rootEpic';
import { composeEnhancers } from './utils';
import { loadState, saveState } from '../utils/localstorage';

export const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
>();

const middlewares = [epicMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const initialState = loadState();

const store = createStore(rootReducer, initialState, enhancer);

store.subscribe(() => {
    saveState(store.getState());
  });


epicMiddleware.run(rootEpic);

export default store;
