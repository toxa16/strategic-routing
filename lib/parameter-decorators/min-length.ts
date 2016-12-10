import {minLengthRegister} from '../registers';

/**
 * Min length parameter decorator.
 * @param minChars
 */
export function minLength(minChars: number) {
  return function (
    classPrototype: Object,
    methodName: string,
    parameterIndex: number) {

    console.log(`Min Length: ${methodName}{${parameterIndex}}`);
    minLengthRegister.set(parameterIndex, minChars);
  }
}