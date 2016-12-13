import {decoratorCore} from './decorator-core';
import {testRegister} from '../registers/test.register';


/**
 * Endpoint decorator for testing purposes.
 * @param route
 * @returns {(target:(Object|Function), methodName:string)=>void}
 * @constructor
 */
export function TestEndpoint(route: string) {
  return function (target: Object|Function, methodName: string): void {
    decoratorCore(target, methodName, testRegister, route);
  };
}