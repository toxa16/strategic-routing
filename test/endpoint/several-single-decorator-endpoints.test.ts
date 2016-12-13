import * as test from 'tape';
import * as _ from 'lodash';
import {testRegister} from '../../lib/registers/test.register';
import {TestEndpoint} from '../../lib/endpoint-decorators/test-endpoint';
import {EndpointRecord} from '../../lib/types/endpoint-record';



class SeveralSingleDecoratorEndpointsService {
  @TestEndpoint('route1')
  endpoint1(param1, param2) {}

  @TestEndpoint('route2')
  static endpoint2(param1, param2, param3) {}

  @TestEndpoint('route3')
  endpoint3() {}
}

const records: EndpointRecord[] = testRegister.records;
testRegister.clear();



test('Several single-decorator endpoints', function (t) {

  t.equal(records.length, 3,
      'three endpoint records should be registered');


  // first endpoint 'endpoint1'
  const firstRecord = _.find(records, ['name', 'endpoint1']);
  t.ok(firstRecord,
      `endpoint with name 'endpoint1' should be registered`);
  t.equal(firstRecord.routes.length, 1,
      `endpoint 'endpoint1' should have one route`);
  t.equal(firstRecord.routes[0], 'route1',
      `endpoint's 'endpoint1' [only] route should be 'route1'`);
  t.equal(firstRecord.parameters.length, 2,
      `endpoint 'endpoint1' should contain two parameter records`);


  // second endpoint 'endpoint2'
  const secondRecord = _.find(records, ['name', 'endpoint2']);
  t.ok(secondRecord,
      `endpoint with name 'endpoint2' should be registered`);
  t.equal(secondRecord.routes.length, 1,
      `endpoint 'endpoint2' should have one route`);
  t.equal(secondRecord.routes[0], 'route2',
      `endpoint's 'endpoint2' [only] route should be 'route2'`);
  t.equal(secondRecord.parameters.length, 3,
      `endpoint 'endpoint2' should contain three parameter records`);


  // third endpoint 'endpoint3'
  const thirdRecord = _.find(records, ['name', 'endpoint3']);
  t.ok(thirdRecord,
      `endpoint with name 'endpoint3' should be registered`);
  t.equal(thirdRecord.routes.length, 1,
      `endpoint 'endpoint3' should have one route`);
  t.equal(thirdRecord.routes[0], 'route3',
      `endpoint's 'endpoint3' [only] route should be 'route3'`);
  t.equal(thirdRecord.parameters.length, 0,
      `endpoint 'endpoint3' should not contain any parameter records`);


  t.end();
});
