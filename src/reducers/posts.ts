import { Record } from 'immutable';
import { combineReducers } from 'redux';
import {
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_POSTS,
} from '../actions/actions';

interface IAction {
  type: string;
  posts: Array<{title: string}>;
  receivedAt: number;
  subreddit: string;
  lastUpdated: string;
}

const PostsRecord = Record({
  didInvalidate: false,
  isFetching: false,
  items: [],
  lastUpdated: '',
});

export class PostsState extends PostsRecord {
  public didInvalidate: boolean;
  public isFetching: boolean;
  public items: Array<{title: string}>;
  public lastUpdated: string;
};

const initialPostsState = new PostsState();

export default function postsBySubreddit(state: PostsState = initialPostsState, action: IAction) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return state.set('didInvalidate', true);
    case RECEIVE_POSTS:
      console.log(action.posts)
      return state.withMutations((ctx) => {
          ctx.set('didInvalidate', false)
            .set('isFetching', false)
            .set('items', action.posts)
            .set('lastUpdated', action.receivedAt);
      });
    case REQUEST_POSTS:
      return state.withMutations((ctx) => {
        ctx.set('didInvalidate', false)
          .set('isFetching', true);
      });
    default:
      return state;
  }
};
