import 'reflect-metadata';
import {getMethodParamNames} from './helpers';
import {EndpointRecord} from '../types/endpoint-record';
import {
  requiredRegister, patternRegister,
  minLengthRegister, postRegister
} from '../registers';
import {ParameterRecord} from '../types/parameter-record';





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
      routes: route,
      parameters: params,
    };
    postRegister.push(endpointRecord);

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
