import {requiredRegister} from './registers';

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

  // TODO: logging
  console.log(`Required: ${methodName}{${parameterIndex}}`);

  if (requiredRegister.has(parameterIndex)) {
    throw new Error('Multiple @required decorators on single parameter.');
  }

  requiredRegister.register(parameterIndex, true);
}