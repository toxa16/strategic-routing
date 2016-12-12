import {minLengthRegister} from './registers';

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
      throw new Error('minChars argument must be positive.');
    }

    if (!Number.isFinite(minChars)) {
      throw new Error('minChars argument must be finite.');
    }

    if (Number.isNaN(minChars)) {
      throw new Error('minChars argument cannot be NaN.');
    }

    if (minLengthRegister.has(parameterIndex)) {
      throw new Error('Multiple @minLength decorators on single parameter.');
    }

    minLengthRegister.register(parameterIndex, minChars);
  }
}