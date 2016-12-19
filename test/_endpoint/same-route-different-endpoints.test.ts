import * as test from 'tape';
import {TestEndpoint} from '../../lib/endpoint-decorators/test-endpoint';
import {testRegister} from '../../lib/registers/test.register';




test('Same decorator and route for different endpoints', function (t) {

  t.throws(function () {

    class SameRouteDifferentEndpointsService {
      @TestEndpoint('route')
      static endpoint1(param1) {}

      @TestEndpoint('route')
      endpoint2() {}
    }

  }, `an error should be thrown`);

  testRegister.clear();
  t.end();
});
