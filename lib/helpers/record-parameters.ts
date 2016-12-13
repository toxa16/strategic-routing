import {ParameterRecord} from '../types/parameter-record';
import {requiredRegister} from '../registers/required.register';
import {patternRegister} from '../registers/pattern.register';
import {minLengthRegister} from '../registers/min-length.register';
import {emailRegister} from '../registers/email.register';


/**
 * Creates a detailed record of endpoint parameters.
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
      email: emailRegister.apply(index),
    };

    params.push(param);
  }

  // clearing parameter registers
  requiredRegister.clear();
  patternRegister.clear();
  minLengthRegister.clear();
  emailRegister.clear();
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