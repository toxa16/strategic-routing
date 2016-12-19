import {parameterRegister} from '../registers/parameter.register';
import {patternSymbol} from '../symbols/pattern.symbol';


/**
 * Pattern parameter decorator.
 * @param regexp
 */
export function pattern(regexp: RegExp) {
  return function (
      classPrototype: Object,
      methodName: string,
      parameterIndex: number
  ) {
    // TODO: logging
    console.log(`Pattern: ${methodName}[${parameterIndex}]`);
    parameterRegister.register(patternSymbol, parameterIndex, regexp);
  }
}