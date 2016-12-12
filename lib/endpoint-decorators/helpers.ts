import {ParameterRecord} from '../types/parameter-record';
import {
  requiredRegister, patternRegister,
  minLengthRegister
} from '../parameter-decorators/registers';


/**
 * Transforms camelCasedStrings into dash-cased-ones
 * @param myStr
 * @returns {string}
 */
export function camelCaseToDash(myStr: string): string {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}


/**
 * Obtains parameter names of a function
 * @param fn
 * @returns {string[]}
 */
export function getMethodParamNames(fn: Function): string[] {
  const fstr = fn.toString();
  const result = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'')
    .replace(/\s/gi,'').split(',');
  if (result.length == 1 && result[0] === '') {
    return []
  } else {
    return result;
  }
}


/**
 *
 * @param method
 * @returns {ParameterRecord[]}
 */
export function recordParameters(method: Function): ParameterRecord[] {
  let params: ParameterRecord[] = [];
  const paramNames = getMethodParamNames(method);
  for (const paramName of paramNames) {
    const index = paramNames.indexOf(paramName);

    let param: ParameterRecord = {
      name: paramName,
      required: requiredRegister.apply(index),
      pattern: patternRegister.apply(index),
      minLength: minLengthRegister.apply(index),
    };

    params.push(param);
  }

  // clearing parameter registers
  requiredRegister.clear();
  patternRegister.clear();
  minLengthRegister.clear();
  return params;
}