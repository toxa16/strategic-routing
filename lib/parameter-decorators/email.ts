import {emailRegister} from '../registers/email.register';

/**
 * Email parameter decorator.
 * @param classPrototype
 * @param methodName
 * @param parameterIndex
 */
export function email(
    classPrototype: Object,
    methodName: string,
    parameterIndex: number) {

  console.log(`Email: ${methodName}{${parameterIndex}}`);

  if (emailRegister.has(parameterIndex)) {
    throw new Error('Multiple @email decorators on single parameter.');
  }

  emailRegister.register(parameterIndex, true);
}