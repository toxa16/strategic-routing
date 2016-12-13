import {patternRegister} from '../registers/pattern.register';

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

    if (patternRegister.has(parameterIndex)) {
      throw new Error('Multiple @pattern decorators on single parameter.');
    }

    patternRegister.register(parameterIndex, regexp);
  }
}