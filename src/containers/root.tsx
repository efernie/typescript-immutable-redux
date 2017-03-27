import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './asyncapp';

const store = configureStore();

export default class Root extends React.Component<void, void> {

  public render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    );
  }
}
