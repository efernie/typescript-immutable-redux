require('es6-promise').polyfill();
require('isomorphic-fetch');

export const REQUEST_POSTS: string = 'REQUEST_POSTS';
export const RECEIVE_POSTS: string = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT: string = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT: string = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit: object) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit: object) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit: object) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit: object, json: any) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit: object) {
  return (dispatch: any) => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state: any, subreddit: any) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit: any) {
  return (dispatch: any, getState: any) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
