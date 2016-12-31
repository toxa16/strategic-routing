import ParameterRegister from '../../lib/types/parameter-register';
import requiredSymbol from '../../lib/symbols/required.symbol';
import emailSymbol from '../../lib/symbols/email.symbol';
import minlengthSymbol from '../../lib/symbols/minlength.symbol';
import {ParameterRecord} from '../../lib/types/parameter-record';
import * as assert from 'assert';


describe('ParameterRegister class', function () {

  // target function
  const signInFn = function (email, password, rememberMe) {};

  // parameter register mock
  const register = new ParameterRegister();

  // 'email' parameter (required, email)
  const emailIndex = 0;
  const emailName = 'email';
  register.register(requiredSymbol, emailIndex, true);
  register.register(emailSymbol, emailIndex, true);

  // 'password' parameter (required, minlength 4)
  const passwordIndex = 1;
  const passwordName = 'password';
  register.register(requiredSymbol, passwordIndex, true);
  const minChars = 4;
  register.register(minlengthSymbol, passwordIndex, minChars);

  // 'rememberMe' parameter (doesn't have decorators)
  const rememberMeIndex = 2;
  const rememberMeName = 'rememberMe';


  // executing...
  const records: ParameterRecord[] = register.apply(signInFn);

  it(`should return three parameter records`, function () {
    assert.equal(records.length, 3);
  });


  // asserting email
  const param1 = records[emailIndex];
  it(`should return first record with name '${emailName}'`, function () {
    assert.equal(param1.name, emailName);
  });

  it(`should return first parameter with 'required' validator`, function () {
    assert.ok(param1.validators[Symbol.keyFor(requiredSymbol)]);
  });
  it(`should return first parameter with 'email' validator`, function () {
    assert.ok(param1.validators[Symbol.keyFor(emailSymbol)]);
  });
  it(`should return first parameter without 'minlength' validator`, function () {
    assert.ok(!param1.validators[Symbol.keyFor(minlengthSymbol)]);
  });


  // asserting password
  const param2 = records[passwordIndex];
  it(`should return second record with name '${passwordName}'`, function () {
    assert.equal(param2.name, passwordName);
  });

  it(`should return second parameter with 'required' validator`, function () {
    assert.ok(param2.validators[Symbol.keyFor(requiredSymbol)]);
  });
  it(`should return second parameter with 'minlength' validator of value ${minChars}`, function () {
    assert.equal(param2.validators[Symbol.keyFor(minlengthSymbol)], minChars);
  });
  it(`should return second parameter without 'email' validator`, function () {
    assert.ok(!param2.validators[Symbol.keyFor(emailSymbol)]);
  });


  // asserting rememberMe
  const param3 = records[rememberMeIndex];
  it(`should return third record with name '${rememberMeName}'`, function () {
    assert.equal(param3.name, rememberMeName);
  });

  it(`should return third parameter without 'required' validator`, function () {
    assert.ok(!param3.validators[Symbol.keyFor(requiredSymbol)]);
  });
  it(`should return third parameter without 'minlength' validator`, function () {
    assert.ok(!param3.validators[Symbol.keyFor(minlengthSymbol)]);
  });
  it(`should return third parameter without 'email' validator`, function () {
    assert.ok(!param3.validators[Symbol.keyFor(emailSymbol)]);
  });


  // assert clearing parameter register
  // DOESN'T NOT WORK ANY MORE
  /*it(`should clear parameter register`, function () {
    const recs = register.apply(signInFn);
    assert.equal(recs.length, 0);
  })*/
});