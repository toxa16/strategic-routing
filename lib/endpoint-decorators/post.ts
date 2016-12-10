import 'reflect-metadata';
import {getMethodParamNames} from './helpers';
import {EndpointRecord} from '../types/endpoint-record';
import {
  requiredRegister, patternRegister,
  minLengthRegister
} from '../registers';
import {ParameterRecord} from '../types/parameter-record';


/**
 * POST endpoint register.
 * @type {Array}
 */
export let posts: EndpointRecord[] = [];


/**
 * Post decorator for POST endpoints.
 * @param route
 * @constructor
 */
export function Post(route: string) {
  return function (targetClassPrototype: Object, methodName: string) {

    console.log(`Post ${methodName}`);
    //console.log(patternRegister);

    const params: ParameterRecord[] =
        recordParameters(targetClassPrototype[methodName]);
    console.log(params);

    const endpointRecord: EndpointRecord = {
      name: methodName,
      route: route,
      parameters: params,
    };
    posts.push(endpointRecord);

    console.log('\n');
  }
}


function recordParameters(method: Function): ParameterRecord[] {
  let params: ParameterRecord[] = [];
  const paramNames = getMethodParamNames(method);
  for (const paramName of paramNames) {
    const index = paramNames.indexOf(paramName);

    let param: ParameterRecord = {
      name: paramName,
      required: requiredRegister.includes(index),
      pattern: patternRegister.get(index) || null,
      minLength: minLengthRegister.get(index) || null,
    };

    params.push(param);
  }

  // clearing parameter registers
  requiredRegister.length = 0;
  patternRegister.clear();
  minLengthRegister.clear();
  return params;
}
