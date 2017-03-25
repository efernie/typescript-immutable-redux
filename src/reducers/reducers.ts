import { combineReducers } from 'redux';
import {
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  SELECT_SUBREDDIT,
} from '../actions/actions';

export const selectedSubreddit = function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return action.subreddit;
  default:
    return state;
  }
};

const INITIAL_STATE = {
  didInvalidate: false,
  isFetching: false,
  items: [],
};

export const posts = function posts(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: true,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

export const postsBySubreddit = function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
