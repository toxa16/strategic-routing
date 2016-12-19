import {ParameterRegister} from '../../lib/types/parameter-register';
import * as assert from 'assert';
import {requiredSymbol} from '../../lib/symbols/required.symbol';
import {emailSymbol} from '../../lib/symbols/email.symbol';
import {minlengthSymbol} from '../../lib/symbols/minlength.symbol';


describe('Class ParameterRegister', function () {

  describe(`register() and apply()`, function () {
    const register = new ParameterRegister();

    // emulating email parameter
    const emailIndex = 0;
    register.register(requiredSymbol, emailIndex, true);
    register.register(emailSymbol, emailIndex, true);

    // emulating password parameter
    const passwordIndex = 1;
    const minChars = 4;
    register.register(requiredSymbol, passwordIndex, true);
    register.register(minlengthSymbol, passwordIndex, minChars);


    // applying email
    const emailRes = register.apply(emailIndex);

    // applying password
    const passwordRes = register.apply(passwordIndex);

    // applying unregistered parameter or one without decorators
    const rememberMeIndex = 2;
    const rememberMeRes = register.apply(rememberMeIndex);


    it(`should have registered "required" for parameter #${emailIndex}`, function () {
      assert.ok(emailRes.validators[Symbol.keyFor(requiredSymbol)]);
    });
    it(`should have registered "email" for parameter #${emailIndex}`, function () {
      assert.ok(emailRes.validators[Symbol.keyFor(emailSymbol)]);
    });
    it(`shouldn't have registered "minlength" for parameter #${emailIndex}`, function () {
      assert.ok(!emailRes.validators[Symbol.keyFor(minlengthSymbol)]);
    });

    it(`should have registered "required" for parameter #${passwordIndex}`, function () {
      assert.ok(passwordRes.validators[Symbol.keyFor(requiredSymbol)]);
    });
    it(`should have registered "minlength(4)" for parameter #${passwordIndex}`, function () {
      assert.equal(passwordRes.validators[Symbol.keyFor(minlengthSymbol)], 4);
    });
    it(`shouldn't have registered "email" for parameter #${passwordIndex}`, function () {
      assert.ok(!passwordRes.validators[Symbol.keyFor(emailSymbol)]);
    });

    it(`shouldn't have registered "required" for parameter #${rememberMeIndex}`, function () {
      assert.ok(!rememberMeRes.validators[Symbol.keyFor(requiredSymbol)]);
    });
    it(`shouldn't have registered "email" for parameter #${rememberMeIndex}`, function () {
      assert.ok(!rememberMeRes.validators[Symbol.keyFor(emailSymbol)]);
    });
    it(`shouldn't have registered "minlength" for parameter #${rememberMeIndex}`, function () {
      assert.ok(!rememberMeRes.validators[Symbol.keyFor(minlengthSymbol)]);
    });

    it(`should throw an error on duplicate "required" for parameter #${emailIndex}`, function () {
      const regexp = new RegExp(
          `Multiple @${Symbol.keyFor(requiredSymbol)} decorators`);
      assert.throws(function () {
        register.register(requiredSymbol, emailIndex, true);
      }, regexp);
    });
    it(`should throw an error on duplicate "email" for parameter #${emailIndex}`, function () {
      const regexp = new RegExp(
          `Multiple @${Symbol.keyFor(emailSymbol)} decorators`);
      assert.throws(function () {
        register.register(emailSymbol, emailIndex, true);
      }, regexp);
    });
    it(`should throw an error on duplicate "minlength" for parameter #${passwordIndex}`, function () {
      const regexp = new RegExp(
          `Multiple @${Symbol.keyFor(minlengthSymbol)} decorators`);
      assert.throws(function () {
        register.register(minlengthSymbol, passwordIndex, true);
      }, regexp);
    });
  });

  describe(`clear()`, function () {
    const register = new ParameterRegister();

    // emulating email parameter
    const emailIndex = 0;
    register.register(requiredSymbol, emailIndex, true);
    register.register(emailSymbol, emailIndex, true);

    // emulating password parameter
    const passwordIndex = 1;
    const minChars = 4;
    register.register(requiredSymbol, passwordIndex, true);
    register.register(minlengthSymbol, passwordIndex, minChars);


    // clearing register
    register.clear();


    // applying email
    const emailRes = register.apply(emailIndex);

    // applying password
    const passwordRes = register.apply(passwordIndex);

    it(`should clear registered "required" for parameter #${emailIndex}`, function () {
      assert.ok(!emailRes.validators[Symbol.keyFor(requiredSymbol)]);
    });
    it(`should clear registered "email" for parameter #${emailIndex}`, function () {
      assert.ok(!emailRes.validators[Symbol.keyFor(emailSymbol)]);
    });

    it(`should clear registered "required" for parameter #${passwordIndex}`, function () {
      assert.ok(!passwordRes.validators[Symbol.keyFor(requiredSymbol)]);
    });
    it(`should clear registered "minlength" for parameter #${passwordIndex}`, function () {
      assert.ok(!passwordRes.validators[Symbol.keyFor(minlengthSymbol)]);
    });
  });
});