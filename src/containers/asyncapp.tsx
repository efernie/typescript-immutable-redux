import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { fetchPostsIfNeeded, invalidateSubreddit, selectSubreddit } from '../actions/actions';
import Picker from '../components/picker';
import Posts from '../components/posts';

interface IAsyncAppProps extends React.Props<any> {
  dispatch: Dispatch<any>;

  isFetching: boolean;
  lastUpdated?: number;
  posts: Array<any>;
  selectedSubreddit: string;
};

export class AsyncApp extends React.Component<IAsyncAppProps, void> {
  constructor(props: IAsyncAppProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  public componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  public componentDidUpdate(prevProps: IAsyncAppProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  public handleChange(nextSubreddit: string) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  public handleRefreshClick(e: any) {
    e.preventDefault();

    const {
      dispatch,
      selectedSubreddit,
    } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
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

export const mapStateToProps = (state: any) => {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
    lastUpdated: 0,
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps)(AsyncApp);
