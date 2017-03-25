/* global describe it expect */
import { expect } from 'chai';

import * as actions from '../actions';

describe('Beneficiaries Actions', () => {

  it('should have REQUEST_POSTS constant', () => {
    expect(actions.REQUEST_POSTS).to.exist;
  });
});
