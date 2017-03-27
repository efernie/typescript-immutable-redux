import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { fetchPostsIfNeeded, invalidateSubreddit, selectSubreddit } from '../actions/actions';
import Picker from '../components/picker';
import Posts from '../components/posts';
import { RedditRootState } from '../configureStore';

interface IAsyncAppProps extends React.Props<any> {

  isFetching: boolean;
  lastUpdated?: number;
  posts: Array<any>;
  selectedSubreddit: string;

  selectSubreddit: Function;
  fetchPostsIfNeeded: Function;
  invalidateSubreddit: Function;
};

export class AsyncApp extends React.Component<IAsyncAppProps, any> {
  constructor(props: IAsyncAppProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  public componentDidMount() {
    const { fetchPostsIfNeeded, selectedSubreddit } = this.props;
    fetchPostsIfNeeded(selectedSubreddit);
  }

  public componentDidUpdate(prevProps: IAsyncAppProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { fetchPostsIfNeeded, selectedSubreddit } = this.props;
      fetchPostsIfNeeded(selectedSubreddit);
    }
  }

  public handleChange(nextSubreddit: string) {
    this.props.selectSubreddit(nextSubreddit);
    this.props.fetchPostsIfNeeded(nextSubreddit);
  }

  public handleRefreshClick(e: any) {
    e.preventDefault();

    const {
      selectedSubreddit,
      invalidateSubreddit,
      fetchPostsIfNeeded,
    } = this.props;

    invalidateSubreddit(selectedSubreddit);
    fetchPostsIfNeeded(selectedSubreddit);
  }

  public render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    );
  }
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchPostsIfNeeded: (selectedSubreddit: string) => dispatch(fetchPostsIfNeeded(selectedSubreddit)),
    invalidateSubreddit: (selectedSubreddit: string) => dispatch(invalidateSubreddit(selectedSubreddit)),
    selectSubreddit: (nextSubreddit: string) =>  dispatch(selectSubreddit(nextSubreddit)),
  };
};

interface ICreateViewStateProps {
  posts: any;
  selectedSubreddit: string;
  isFetching: boolean;
  lastUpdated: number;
};

export const mapStateToProps: (state: RedditRootState) => ICreateViewStateProps =
  ({ reddit: state }) => ({
    isFetching: state.postsBySubreddit.isFetching,
    lastUpdated: state.postsBySubreddit.lastUpdated,
    posts: state.postsBySubreddit.items,
    selectedSubreddit: state.selectedSubreddit.subreddit,
});

export default connect<{}, {}, {}>(mapStateToProps, mapDispatchToProps)(AsyncApp);
