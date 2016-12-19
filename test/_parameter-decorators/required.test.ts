import * as test from 'tape';

import {required} from '../../lib/parameter-decorators/required';
import {requiredRegister} from '../../lib/registers/required.register';




test('Required: with decorators', function (t1) {
  t1.plan(6);

  class WithRequiredService {
    withRequired (
      @required param1, // 0 - true
      param2,           // 1 - false
      @required param3, // 2 - true
      @required param4, // 3 - true
      param5) {}        // 4 - false
  }


  const numRequired = 3;
  t1.equal(requiredRegister.size(), numRequired,
    `Required register should contain ${numRequired} records.`);

  const truthyIndexes = [0, 2, 3];
  for (const index of truthyIndexes) {
    t1.ok(requiredRegister.apply(index),
      `Required register should contain truthy record with index ${index}.`)
  }

  const falsyIndexes = [1, 4];
  for (const index of falsyIndexes) {
    t1.notOk(requiredRegister.apply(index),
      `Required register should not contain a record with index ${index}.`)
  }


  requiredRegister.clear();
  t1.end();
});

test('Required: without decorators', function (t2) {
  t2.plan(1);

  class WithoutRequiredService {
    withoutRequired(param1, param2) {}
  }

  t2.equal(requiredRegister.size(), 0,
    `Required register should not contain any records.`);

  requiredRegister.clear();
  t2.end();
});

test('Required: multiple decorators on single parameter', function (t3) {
  t3.plan(1);

  t3.throws(function () {
    class MultipleRequiredService {
      multiple(@required @required param) {}
    }
  }, 'an error should be thrown');

  requiredRegister.clear();
  t3.end();
});