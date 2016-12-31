import postRegister from '../registers/post.register';
import decoratorCore from './decorator-core';
import parameterRegister from '../registers/parameter.register';


/**
 * Post decorator for POST endpoints.
 * @param route
 * @returns {(target:(Object|Function), endpointName:string)=>void}
 * @constructor
 */
export function Post(route: string) {
  return function (target: Object|Function, endpointName: string): void {

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

    decoratorCore(
        target, endpointName, postRegister, parameterRegister, route);
  }
}
