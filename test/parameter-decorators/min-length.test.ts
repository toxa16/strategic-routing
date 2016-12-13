import * as test from 'tape';
import {minLength} from '../../lib/parameter-decorators/min-length';
import {minLengthRegister} from '../../lib/registers/min-length.register';


test('MinLength: with decorators', function (t) {
  t.plan(6);

  const length0 = 13;
  const length1 = 1;
  const length2 = 8;
  const length4 = 21;


  class WithMinLengthService {

    withPattern(
        @minLength(length0) param0,
        @minLength(length1) param1,
        @minLength(length2) param2,
        param3,
        @minLength(length4) param4
    ) {}
  }


  const numMinLength = 4;
  t.equal(minLengthRegister.size(), numMinLength,
    `minLength register should contain ${numMinLength} records`);

  t.equal(minLengthRegister.apply(0), length0,
    `minLength register should contain a record with index ${0} and value ${length0}`);
  t.equal(minLengthRegister.apply(1), length1,
    `minLength register should contain a record with index ${1} and value ${length1}`);
  t.equal(minLengthRegister.apply(2), length2,
    `minLength register should contain a record with index ${2} and value ${length2}`);
  t.equal(minLengthRegister.apply(4), length4,
    `minLength register should contain a record with index ${4} and value ${length4}`);

  t.notOk(minLengthRegister.apply(3),
    `minLength register should not contain a record with index ${3}`);

  minLengthRegister.clear();
  t.end();
});


test('MinLength: without decorators', function (t) {
  t.plan(1);

  class WithoutMinLengthService {
    withoutPattern(param1, param2, param3) {}
  }

  t.equal(minLengthRegister.size(), 0,
    `minLength register should not contain any records`);

  minLengthRegister.clear();
  t.end();
});


test('MinLength: multiple decorators on single parameter', function (t) {
  t.plan(1);

  t.throws(function () {

    class MultipleMinLengthService {
      multiple(
        @minLength(2) @minLength(11) param
      ) {}
    }

  }, 'an error should be thrown');

  t.end();
});


test('MinLength: argument validation', function (t) {
  t.plan(9);


  t.throws(function () {
    class ZeroMinLengthService {
      multiple(
        @minLength(0) param
      ) {}
    }
  }, 'an error should be thrown on zero');

  t.throws(function () {
    class NegativeIntMinLengthService {
      multiple(
        @minLength(-5) param
      ) {}
    }
  }, 'an error should be thrown on negative integer');

  t.throws(function () {

    class FloatMinLengthService {
      multiple(
        @minLength(-Infinity) param
      ) {}
    }

  }, 'an error should be thrown on float number');
  t.throws(function () {
    class NegativeFloatMinLengthService {
      multiple(
        @minLength(-1.25) param
      ) {}
    }
  }, 'an error should be thrown negative float number');

  t.throws(function () {

    class NanMinLengthService {
      multiple(
        @minLength(NaN) param
      ) {}
    }

  }, 'an error should be thrown on NaN');
  t.throws(function () {

    class NegativeNanMinLengthService {
      multiple(
        @minLength(-NaN) param
      ) {}
    }

  }, 'an error should be thrown on -NaN');

  t.throws(function () {

    class InfinityMinLengthService {
      multiple(
        @minLength(Infinity) param
      ) {}
    }

  }, 'an error should be thrown on Infinity');
  t.throws(function () {

    class NegativeInfinityMinLengthService {
      multiple(
        @minLength(-Infinity) param
      ) {}
    }

  }, 'an error should be thrown on -Infinity');

  t.throws(function () {

    class NonNumberMinLengthService {
      multiple(
        @minLength(-Int8Array) param
      ) {}
    }

  }, 'an error should be thrown on non-Number construction (with minus sign)');


  minLengthRegister.clear();
  t.end();
});