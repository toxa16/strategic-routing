import {ParameterRecord} from '../types/parameter-record';
import {ParameterRegister} from '../types/parameter-register';



/**
 * Creates a detailed record of endpoint parameters.
 * @param method
 * @param register
 * @returns {ParameterRecord[]}
 */
export function recordParameters(
    method: Function,
    register: ParameterRegister
): ParameterRecord[] {

  let params: ParameterRecord[] = [];
  const paramNames = getMethodParamNames(method);
  for (const paramName of paramNames) {
    const index = paramNames.indexOf(paramName);
    const paramInfo = register.apply(index);

    let param: ParameterRecord = {
      name: paramName,
      validators: paramInfo.validators,
    };

    params.push(param);
  }

  register.clear();
  return params;
}



/**
 * Obtains parameter names of a function.
 * @param fn
 * @returns {string[]}
 */
function getMethodParamNames(fn: Function): string[] {
  const fstr = fn.toString();
  const result = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'')
    .replace(/\s/gi,'').split(',');
  if (result.length == 1 && result[0] === '') {
    return []
  } else {
    return result;
  }
}