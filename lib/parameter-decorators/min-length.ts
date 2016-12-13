import {minLengthRegister} from '../registers/min-length.register';

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

    if (minChars < 0) {
      throw new Error('minLength argument must be positive.');
    }

    if (!Number.isFinite(minChars)) {
      throw new Error('minLength argument must be finite.');
    }

    if (Number.isNaN(minChars)) {
      throw new Error('minLength argument cannot be NaN.');
    }

    if (minLengthRegister.has(parameterIndex)) {
      throw new Error('Multiple @minLength decorators on single parameter.');
    }

    minLengthRegister.register(parameterIndex, minChars);
  }
}