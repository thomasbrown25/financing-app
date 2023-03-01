import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { devToolsEnhancer } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import { setAuthToken } from '../utils/api.utils';
import { rootReducer } from './root-reducer';

const initialState = {};

const middleware = [
  thunk,
  process.env.NODE_ENV !== 'production' && logger
].filter(Boolean);

// middleware.push(devToolsEnhancer());

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: middleware,
  devTools: devToolsEnhancer()
});

/*
  initialize current state from redux store for subscription comparison
  preventing undefined error
 */
let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.user.token !== currentState.user.token) {
    console.log('logging token state');
    console.log(previousState);
    console.log(currentState);
    const token = currentState.user.token;
    setAuthToken(token);
  }
});

export default store;
