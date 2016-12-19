import {parameterRegister} from '../registers/parameter.register';
import {requiredSymbol} from '../symbols/required.symbol';


/**
 * Required parameter decorator.
 * @param classPrototype
 * @param methodName
 * @param parameterIndex
 */
export function required(
    classPrototype: Object,
    methodName: string,
    parameterIndex: number
) {
  // TODO: logging
  console.log(`Required: ${methodName}[${parameterIndex}]`);
  parameterRegister.register(requiredSymbol, parameterIndex, true);
}