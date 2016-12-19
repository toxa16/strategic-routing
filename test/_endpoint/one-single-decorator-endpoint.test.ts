import * as test from 'tape';
import {testRegister} from '../../lib/registers/test.register';
import {TestEndpoint} from '../../lib/endpoint-decorators/test-endpoint';
import {EndpointRecord} from '../../lib/types/endpoint-record';



class OneSingleDecoratorEndpointService {
  @TestEndpoint('route')
  endpoint(param1, param2) {}
}

const records: EndpointRecord[] = testRegister.records;
testRegister.clear();



test('One single-decorator endpoint', function (t) {
  //t.plan(5);


  t.equal(records.length, 1,
      'one endpoint record should be registered');


  t.equal(records[0].name, 'endpoint',
      `endpoint's name should be 'endpoint'`);


  t.equal(records[0].routes.length, 1,
      `endpoint's route array should contain one route`);
  t.equal(records[0].routes[0], 'route',
      `endpoint's [only] route should be 'route'`);


  t.equal(records[0].parameters.length, 2,
      `endpoint record should contain two parameter records`);


  testRegister.clear();
  t.end();
});




/*describe.only('One single-decorator endpoint test', function() {

  after(function () {
    testRegister.clear();
  });

  class OneSingleService {
    @TestEndpoint('route')
    endpoint(param1, param2) {}
  }

  it('should register one endpoint record', function() {
    assert.equal(testRegister.size(), 1);
  });

  it('endpoint record should have a name "endpoint"', function(done) {
    testRegister.forEach((record: EndpointRecord) => {
      assert.equal(record.name, 'endpoint');
      done();
    });
  });

  it('endpoint record should have a route "route"', function(done) {
    testRegister.forEach((record: EndpointRecord) => {
      assert.equal(record.routes, 'route');
      done();
    });
  });
});*/