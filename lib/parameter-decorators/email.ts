import {parameterRegister} from '../registers/parameter.register';
import {emailSymbol} from '../symbols/email.symbol';


/**
 * Email parameter decorator.
 * @param classPrototype
 * @param methodName
 * @param parameterIndex
 */
export function email(
    classPrototype: Object,
    methodName: string,
    parameterIndex: number
) {
  // TODO: logging
  console.log(`Email: ${methodName}[${parameterIndex}]`);
  parameterRegister.register(emailSymbol, parameterIndex, true);
}