/**
 * GET register
 * @type {Array}
 */
export let gets = [];

/**
 * Get decorator for GET service methods.
 * @param route
 * @constructor
 */
export function Get(route: string) {
  return function (target: any, methodName: string) {
    //console.log(target);
    //console.log(methodName);
    const methodRecord = {
      route: route,
      methodName: methodName
    };
    gets.push(methodRecord);
    //console.log(`GET ${methodName} registered`);
  }
}
