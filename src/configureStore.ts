import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer, { RootState } from './reducers';
import { combineReducers } from 'redux';


export interface RedditRootState {
  reddit: RootState;
}

export interface IRedditReducer {
  <A>(state: RedditRootState, action: A): RedditRootState;
}

export const redditReducer = combineReducers<RedditRootState>({
  reddit: rootReducer,
});

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState?: any) {
  return createStore(
    redditReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
};
