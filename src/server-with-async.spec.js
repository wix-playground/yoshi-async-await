import {expect} from 'chai';

import {factory} from './server-with-async';

describe('whatever', () => {
  it('should work', async () => {
    await factory().justDoIt(null, {
      json: () => {}
    });
    expect(true).to.be.true;
  });
});
