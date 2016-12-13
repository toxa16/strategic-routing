import {postRegister} from '../registers/post.register';
import {decoratorCore} from './decorator-core';


/**
 * Post decorator for POST endpoints.
 * @param route
 * @returns {(target:(Object|Function), methodName:string)=>void}
 * @constructor
 */
export function Post(route: string) {
  return function (target: Object|Function, methodName: string): void {

    /*console.log(`Post ${methodName}`);

    const params: ParameterRecord[] =
        recordParameters(target[methodName]);
    console.log(params);

    const endpointRecord: EndpointRecord = {
      name: methodName,
      routes: route,
      parameters: params,
    };
    postRegisterOld.push(endpointRecord);

    console.log('\n');*/

    decoratorCore(target, methodName, postRegister, route);
  }
}


/*function recordParameters(method: Function): ParameterRecord[] {
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
}*/
