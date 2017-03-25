import * as React from 'react';

export default class Posts extends React.Component {
  public render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>{post.title}</li>,
        )}
      </ul>
    );
  }
};

Posts.propTypes = {
  posts: React.PropTypes.array.isRequired,
};
