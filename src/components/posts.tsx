import * as React from 'react';

interface IPostsProps extends React.Props<any> {
  posts: Array<any>;
};

export default class Posts extends React.Component<IPostsProps, void> {
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
