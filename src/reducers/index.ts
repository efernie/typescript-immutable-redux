import * as Immutable from 'immutable';
import { combineReducers as combineReducersTypeFixed } from '../utils/types';
import { combineReducers } from 'redux-immutable';

import postsBySubredditReducer, { PostsState } from './posts';
import selectedSubredditReducer, { SelectedState } from './selected-subreddit';

const RootStateRecord = Immutable.Record({
  postsBySubreddit: new PostsState(),
  selectedSubreddit: new SelectedState(),
});

export class RootState extends RootStateRecord {};

export {
  SelectedState,
  PostsState,
};

/* This is a hack to force typescript to recognize the arity of
   `combineReducers` as defined by 'redux-immutable'. When
   DefinitelyTyped is updated this won't be necessary anymore. */
const fixedCombineReducers = combineReducers as combineReducersTypeFixed;
export default fixedCombineReducers({
  postsBySubreddit: postsBySubredditReducer,
  selectedSubreddit: selectedSubredditReducer,
}, () => new RootState());
