import { Record } from 'immutable';
import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
} from '../actions/actions';

interface ISelectedSubredditAction {
  subreddit: string;
  type: string;
}

const SelectedStateRecord = Record({
  subreddit: 'reactjs',
});

export class SelectedState extends SelectedStateRecord {
  public subreddit: string;
};

const initialSelectedState = new SelectedState();

export default function selectedSubreddit(state = initialSelectedState, action: ISelectedSubredditAction) {
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return state.set('subreddit', action.subreddit);
  default:
    return state;
  }
};
