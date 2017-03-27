import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
const shallowWithStore = require('enzyme-redux').shallowWithStore;
const createMockStore = require('redux-test-utils').createMockStore;
import * as React from 'react';

import {AsyncApp} from '../asyncapp';

describe('<AsyncApp />', () => {

  it('calls componentDidMount', () => {
    // const dispatch = () => {};
    /*const wrapper = mount(
      <AsyncApp
        dispatch={dispatch}
        isFetching={false}
        selectedSubreddit={''}
        posts={[]} />,
    );*/
    // expect(AsyncApp.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});
