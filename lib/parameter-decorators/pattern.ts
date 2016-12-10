import {patternRegister} from '../registers';

/**
 * Pattern parameter decorator.
 * @param regexp
 */
export function pattern(regexp: RegExp) {
  return function (
      classPrototype: Object,
      methodName: string,
      parameterIndex: number) {

    console.log(`Pattern: ${methodName}{${parameterIndex}}`);
    patternRegister.set(parameterIndex, regexp);
  }
}