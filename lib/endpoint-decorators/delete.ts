import {decoratorCore} from './decorator-core';
import {deleteRegister} from '../registers/delete.register';


/**
 * Delete decorator for DELETE endpoints.
 * @param route
 * @returns {(target:(Object|Function), methodName:string)=>void}
 * @constructor
 */
export function Delete(route: string) {
  return function (target: Object|Function, methodName: string): void {
    decoratorCore(target, methodName, deleteRegister, route);
  }
}
