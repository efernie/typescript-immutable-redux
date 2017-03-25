require('es6-promise').polyfill();
require('isomorphic-fetch');

export const REQUEST_POSTS: string = 'REQUEST_POSTS';
export const RECEIVE_POSTS: string = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT: string = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT: string = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit: string) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit: string) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

export function requestPosts(subreddit: string) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

export interface IJSONResponse {
  data: {
    children: any;
  };
};

export function receivePosts(subreddit: string, json: IJSONResponse) {
  return {
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now(),
    subreddit,
    type: RECEIVE_POSTS,
  };
}

export function fetchPosts(subreddit: string) {
  return (dispatch: any) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response: any) => response.json())
      .then((json: IJSONResponse) => dispatch(receivePosts(subreddit, json)));
  };
}

export function shouldFetchPosts(state: any, subreddit: string) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
