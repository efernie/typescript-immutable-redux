import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import {spy} from 'sinon';

import Picker from '../picker';

describe('<Picker />', () => {

  it('should render h1 with text', () => {
    const onChange = spy();
    const wrapper = shallow(
      <Picker
        onChange={onChange}
        value={'Updated guide to react and redux'}
        options={[]} />,
    );

    expect(wrapper.contains(<h1>Updated guide to react and redux</h1>)).to.equal(true);
  });

});
