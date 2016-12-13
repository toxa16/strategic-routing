import * as test from 'tape';
import * as _ from 'lodash';
import {testRegister} from '../../lib/registers/test.register';
import {TestEndpoint} from '../../lib/endpoint-decorators/test-endpoint';
import {EndpointRecord} from '../../lib/types/endpoint-record';



class SeveralMultiDecoratorEndpointsService {
  @TestEndpoint('route1')
  endpoint1(param1) {}

  @TestEndpoint('route2')
  @TestEndpoint('route3')
  @TestEndpoint('route4')
  endpoint2() {}

  @TestEndpoint('route5')
  @TestEndpoint('route5')
  static endpoint3(param1, param2, param3, param4, param5) {}
}

const records: EndpointRecord[] = testRegister.records;
testRegister.clear();



test('Several multi-decorator endpoints', function (t) {

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
  t.equal(firstRecord.parameters.length, 1,
      `endpoint 'endpoint1' should contain one parameter record`);


  // second endpoint 'endpoint2'
  const secondRecord = _.find(records, ['name', 'endpoint2']);
  t.ok(secondRecord,
      `endpoint with name 'endpoint2' should be registered`);
  t.equal(secondRecord.routes.length, 3,
      `endpoint 'endpoint2' should have three routes`);
  t.ok(secondRecord.routes.includes('route2'),
      `endpoint 'endpoint2' should contain route 'route2'`);
  t.ok(secondRecord.routes.includes('route3'),
      `endpoint 'endpoint2' should contain route 'route3'`);
  t.ok(secondRecord.routes.includes('route4'),
      `endpoint 'endpoint2' should contain route 'route4'`);
  t.equal(secondRecord.parameters.length, 0,
      `endpoint 'endpoint2' should not contain any parameter records`);


  // third endpoint 'endpoint3'
  const thirdRecord = _.find(records, ['name', 'endpoint3']);
  t.ok(thirdRecord,
      `endpoint with name 'endpoint3' should be registered`);
  t.equal(thirdRecord.routes.length, 1,
      `endpoint 'endpoint3' should have one route`);
  t.equal(thirdRecord.routes[0], 'route5',
      `endpoint's 'endpoint3' [only] route should be 'route5'`);
  t.equal(thirdRecord.parameters.length, 5,
      `endpoint 'endpoint3' should contain five parameter records`);


  t.end();
});
