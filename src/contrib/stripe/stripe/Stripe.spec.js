import Harness from '../../../../test/harness';
import StripeComponent from './Stripe';

import {
  comp1
} from './fixtures';

describe('Stripe Component', () => {
  it('Should build an stripe component', (done) => {
    Harness.testCreate(StripeComponent, comp1).then(() => {
      done();
    });
  });
});
