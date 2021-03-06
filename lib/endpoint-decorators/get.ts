import {decoratorCore} from './decorator-core';
import {getRegister} from '../registers/get.register';


/**
 * Get decorator for GET endpoints.
 * @param route
 * @returns {(target:(Object|Function), methodName:string)=>void}
 * @constructor
 */
export function Get(route: string) {
  return function (target: Object|Function, methodName: string): void {
    decoratorCore(target, methodName, getRegister, route);
  }
}
