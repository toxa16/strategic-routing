import {decoratorCore} from './decorator-core';
import {putRegister} from '../registers/put.register';


/**
 * Put decorator for PUT endpoints.
 * @param route
 * @returns {(target:(Object|Function), methodName:string)=>void}
 * @constructor
 */
export function Put(route: string) {
  return function (target: Object|Function, methodName: string): void {
    decoratorCore(target, methodName, putRegister, route);
  }
}
