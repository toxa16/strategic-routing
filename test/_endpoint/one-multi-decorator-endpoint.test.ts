import * as test from 'tape';
import {TestEndpoint} from '../../lib/endpoint-decorators/test-endpoint';
import {testRegister} from '../../lib/registers/test.register';
import {EndpointRecord} from '../../lib/types/endpoint-record';



class OneMultiDecoratorEndpointService {
  @TestEndpoint('route1')
  @TestEndpoint('route2')
  @TestEndpoint('route3')
  endpoint(param1, param2, param3, param4) {}
}

const records: EndpointRecord[] = testRegister.records;
testRegister.clear();




test('One multi-decorator endpoint', function (t) {

  t.equal(records.length, 1,
      `one endpoint record should be registered`);

  const record = records[0];
  t.equal(record.name, 'endpoint',
      `endpoint record should have name 'endpoint'`);

  t.equal(record.routes.length, 3,
      `endpoint record should contain three routes`);

  t.ok(record.routes.includes('route1'),
      `endpoint record should contain route 'route1'`);
  t.ok(record.routes.includes('route2'),
      `endpoint record should contain route 'route2'`);
  t.ok(record.routes.includes('route3'),
      `endpoint record should contain route 'route3'`);

  t.equal(record.parameters.length, 4,
      'endpoint record should contain four parameter records');


  t.end();
});