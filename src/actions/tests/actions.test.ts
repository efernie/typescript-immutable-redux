/* global describe it expect */
import { expect } from 'chai';

import * as actions from '../actions';

describe('Beneficiaries Actions', () => {

  it('should have REQUEST_POSTS constant', () => {
    expect(actions.REQUEST_POSTS).to.exist;
  });

  it('should have RECEIVE_POSTS constant', () => {
    expect(actions.RECEIVE_POSTS).to.exist;
  });

  it('should have SELECT_SUBREDDIT constant', () => {
    expect(actions.SELECT_SUBREDDIT).to.exist;
  });

  it('should have INVALIDATE_SUBREDDIT constant', () => {
    expect(actions.INVALIDATE_SUBREDDIT).to.exist;
  });

  it('should have selectSubreddit constant', () => {
    expect(actions.selectSubreddit).to.exist;
  });

  it('should have invalidateSubreddit constant', () => {
    expect(actions.invalidateSubreddit).to.exist;
  });

  it('should have receivePosts constant', () => {
    expect(actions.receivePosts).to.exist;
  });

  it('should have fetchPosts constant', () => {
    expect(actions.fetchPosts).to.exist;
  });

  it('should have shouldFetchPosts constant', () => {
    expect(actions.shouldFetchPosts).to.exist;
  });

  it('should have fetchPostsIfNeeded constant', () => {
    expect(actions.fetchPostsIfNeeded).to.exist;
  });

});
