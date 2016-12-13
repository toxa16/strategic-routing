import * as test from 'tape';

import {requiredRegister} from '../../lib/registers/required.register';
import {patternRegister} from '../../lib/registers/pattern.register';
import {minLengthRegister} from '../../lib/registers/min-length.register';
import {emailRegister} from '../../lib/registers/email.register';

import {ParameterRecord} from '../../lib/types/parameter-record';
import {recordParameters} from '../../lib/helpers/record-parameters';


test('Record parameters', function (t) {
  //t.plan(26);

  // test entry data
  const recordParametersFn =
      function (param1, param2, param3, param4, param5) {};

  requiredRegister.register(0, true);
  requiredRegister.register(1, true);
  requiredRegister.register(2, true);

  patternRegister.register(2, /@/);

  minLengthRegister.register(0, 4);
  minLengthRegister.register(2, 13);

  emailRegister.register(0, true);
  emailRegister.register(4, true);


  const paramRecs: ParameterRecord[] =
      recordParameters(recordParametersFn);

  const numRecs = 5;
  t.equal(paramRecs.length, numRecs,
    `parameter record array should contain ${numRecs} records`);

  const paramRec1 = paramRecs[0];
  t.equal(paramRec1.name, 'param1');
  t.ok(paramRec1.required);
  t.notOk(paramRec1.pattern);
  t.equal(paramRec1.minLength, 4);
  t.ok(paramRec1.email);


  const paramRec2 = paramRecs[1];
  t.equal(paramRec2.name, 'param2');
  t.ok(paramRec2.required);
  t.notOk(paramRec2.pattern);
  t.notOk(paramRec2.minLength);
  t.notOk(paramRec2.email);


  const paramRec3 = paramRecs[2];
  t.equal(paramRec3.name, 'param3');
  t.ok(paramRec3.required);
  t.deepEqual(paramRec3.pattern, /@/);
  t.equal(paramRec3.minLength, 13);
  t.notOk(paramRec3.email);


  const paramRec4 = paramRecs[3];
  t.equal(paramRec4.name, 'param4');
  t.notOk(paramRec4.required);
  t.notOk(paramRec4.pattern);
  t.notOk(paramRec4.minLength);
  t.notOk(paramRec4.email);


  const paramRec5 = paramRecs[4];
  t.equal(paramRec5.name, 'param5');
  t.notOk(paramRec5.required);
  t.notOk(paramRec5.pattern);
  t.notOk(paramRec5.minLength);
  t.ok(paramRec5.email);




  t.equal(requiredRegister.size(), 0,
      `required register should be empty`);
  t.equal(patternRegister.size(), 0,
      `pattern register should be empty`);
  t.equal(minLengthRegister.size(), 0,
      `minLength register should be empty`);
  t.equal(emailRegister.size(), 0,
      `email register should be empty`);
  t.end();
});