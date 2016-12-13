import * as test from 'tape';
import {pattern} from '../../lib/parameter-decorators/pattern';
import {patternRegister} from '../../lib/registers/pattern.register';


test('Pattern: with decorators', function (t) {
  t.plan(6);

  const regexp1: RegExp = /@/;
  const regexp4: RegExp = /.+@.+/;

  class WithPatternService {

    withPattern(
      param0,
      @pattern(regexp1) param1,
      param2,
      param3,
      @pattern(regexp4) param4
    ) {}
  }

  const numPattern = 2;
  t.equal(patternRegister.size(), numPattern,
    `pattern register should contain ${numPattern} records`);

  t.equal(patternRegister.apply(1), regexp1,
    `pattern register should contain a record with index ${1} and value ${regexp1}`);

  t.equal(patternRegister.apply(4), regexp4,
    `pattern register should contain a record with index ${4} and value ${regexp4}`);

  const falsyIndexes = [0, 2, 3];
  for (const index of falsyIndexes) {
    t.notOk(patternRegister.apply(index),
      `pattern register should not contain a record with index ${index}`);
  }

  patternRegister.clear();
  t.end();
});


test('Pattern: without decorators', function (t) {
  t.plan(1);

  class WithoutPatternService {
    withoutPattern(param1) {}
  }

  t.equal(patternRegister.size(), 0,
    `pattern register should not contain any records`);

  patternRegister.clear();
  t.end();
});


test('Pattern: multiple decorators on single parameter', function (t) {
  t.plan(1);

  t.throws(function () {

    class MultiplePatternService {
      multiple(
          @pattern(/@/) @pattern(/.+@\./) param
      ) {}
    }

  }, 'an error should be thrown');

  patternRegister.clear();
  t.end();
});