import {Post, required, pattern, minLength} from '../index';
import {postRegister} from '../lib/registers';
import {ParameterRecord} from '../lib/types/parameter-record';
import {EndpointRecord} from '../lib/types/endpoint-record';

import * as test from 'tape';


class PostService {

  @Post('/sign-up')
  @Post('/sign-up')
  signUp(
      @required @pattern(/.+@.+/) email,
      @required @minLength(4) password,
      @required passwordConfirm) {
    return true;
  }

  @Post('/sign-in')
  @Post('/log-in')
  @Post('/login')
  static signIn(
      @required @pattern(/@/) email,
      @required password,
      rememberMe) {
    return false;
  }

  @Post('/sign-out')
  signOut() {
    return 1;
  }
}


/*const signUpEmail: ParameterRecord = {
  name: 'email',
  required: true,
  pattern: /.+@.+/,
  minLength: null,
};

const signUpPassword: ParameterRecord = {
  name: 'password',
  required: true,
  pattern: null,
  minLength: 4,
};

const signUpPasswordConfirm: ParameterRecord = {
  name: 'passwordConfirm',
  required: true,
  pattern: null,
  minLength: null,
};

const signUp: EndpointRecord = {
  name: 'signUp',
  routes: ['/sign-up'],
  parameters: [
    signUpEmail,
    signUpPassword,
    signUpPasswordConfirm
  ]
};


const signInEmail: ParameterRecord = {
  name: 'email',
  required: true,
  pattern: /@/,
  minLength: null,
};

const signInPassword: ParameterRecord = {
  name: 'password',
  required: true,
  pattern: null,
  minLength: null,
};

const signInRememberMe: ParameterRecord = {
  name: 'rememberMe',
  required: false,
  pattern: null,
  minLength: null
};

const signIn: EndpointRecord = {
  name: 'signIn',
  routes: ['/login', '/sign-in'],
  parameters: [
    signInEmail,
    signInPassword,
    signInRememberMe
  ]
};



const signOut: EndpointRecord = {
  name: 'signOut',
  routes: ['/sign-out'],
  parameters: []
};


const post: EndpointRecord[] = [
  signUp,
  signIn,
  signOut
];*/

//console.log(post);
//console.log();
console.log(postRegister);
console.log();
console.log();


function countEndpoints(name: string): number {
  let i: number = 0;
  for (const endpoint of postRegister) {
    if (endpoint.name === name) {
      i++
    }
  }
  return i;
}

test('Post decorator', function (t) {

  const numEndpoints = 3;
  t.equal(postRegister.length, numEndpoints,
    `Post register should contain ${numEndpoints} endpoint records.`);

  t.equal(countEndpoints('signUp'), 1,
    `Post register should contain exactly one 'signUp' endpoint.`);
  t.equal(countEndpoints('signIn'), 1,
    `Post register should contain exactly one 'signIn' endpoint.`);
  t.equal(countEndpoints('signOut'), 1,
    `Post register should contain exactly one 'signOut' endpoint.`);

  t.end();
});