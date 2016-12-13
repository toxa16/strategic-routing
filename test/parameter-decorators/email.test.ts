import * as test from 'tape';
import {emailRegister} from '../../lib/registers/email.register';
import {email} from '../../lib/parameter-decorators/email';


test('Email: with decorators', function (t1) {
  t1.plan(6);

  class WithRequiredService {
    withRequired (
      @email param0,
      param1,
      param2,
      param3,
      @email param4) {}
  }


  const numEmail = 2;
  t1.equal(emailRegister.size(), numEmail,
    `email register should contain ${numEmail} records`);

  const truthyIndexes = [0, 4];
  for (const index of truthyIndexes) {
    t1.ok(emailRegister.apply(index),
      `email register should contain truthy record with index ${index}`)
  }

  const falsyIndexes = [1, 2, 3];
  for (const index of falsyIndexes) {
    t1.notOk(emailRegister.apply(index),
      `email register should not contain a record with index ${index}`)
  }


  emailRegister.clear();
  t1.end();
});

test('Email: without decorators', function (t) {
  t.plan(1);

  class WithoutRequiredService {
    withoutRequired(param1, param2) {}
  }

  t.equal(emailRegister.size(), 0,
    `Email register should not contain any records.`);

  emailRegister.clear();
  t.end();
});

test('Email: multiple decorators on single parameter', function (t) {
  t.plan(1);

  t.throws(function () {
    class MultipleRequiredService {
      multiple(@email @email param) {}
    }
  }, 'an error should be thrown');

  emailRegister.clear();
  t.end();
});