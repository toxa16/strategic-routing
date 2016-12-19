import {parameterRegister} from '../registers/parameter.register';
import {minlengthSymbol} from '../symbols/minlength.symbol';


/**
 * Min length parameter decorator.
 * @param minChars
 */
export function minlength(minChars: number) {
  return function (
    classPrototype: Object,
    methodName: string,
    parameterIndex: number
  ) {

    // TODO: logging
    console.log(`Minlength: ${methodName}[${parameterIndex}]`);

    if (minChars < 0) {
      throw new Error('minlength argument must be positive.');
    }

    if (!Number.isFinite(minChars)) {
      throw new Error('minlength argument must be finite.');
    }

    if (Number.isNaN(minChars)) {
      throw new Error('minlength argument cannot be NaN.');
    }

    parameterRegister.register(minlengthSymbol, parameterIndex, minChars);
  }
}