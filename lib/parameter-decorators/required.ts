import {requiredRegister} from '../registers';

/**
 * Required parameter decorator.
 * @param classPrototype
 * @param methodName
 * @param parameterIndex
 */
export function required(
    classPrototype: Object,
    methodName: string,
    parameterIndex: number) {

  console.log(`Required: ${methodName}{${parameterIndex}}`);
  requiredRegister.push(parameterIndex);
}