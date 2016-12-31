import requiredSymbol from '../symbols/required.symbol';
import emailSymbol from '../symbols/email.symbol';
import patternSymbol from '../symbols/pattern.symbol';
import minlengthSymbol from '../symbols/minlength.symbol';
import {ParameterRecord} from './parameter-record';
import getMethodParamNames from '../helpers/get-method-param-names';


/**
 * Parameter register class.
 */
export default class ParameterRegister {


  /**
   * Class constructor.
   */
  constructor() {
    this[requiredSymbol] = new Map<number, boolean>();
    this[emailSymbol] = new Map<number, boolean>();
    this[patternSymbol] = new Map<number, RegExp>();
    this[minlengthSymbol] = new Map<number, number>();
  }


  /**
   * Registers corresponding decorator info.
   * @param decoratorSymbol
   * @param index
   * @param decoratorArgument
   */
  public register(
      decoratorSymbol: symbol,
      index: number,
      decoratorArgument: any
  ): void {
    if (this[decoratorSymbol].has(index)) {
      throw new Error(
          `Multiple @${Symbol.keyFor(decoratorSymbol)} decorators ` +
          `on the same property.`);
    }
    this[decoratorSymbol].set(index, decoratorArgument);
  }


  /**
   * Returns endpoint's parameter information.
   * @param endpoint
   * @returns {ParameterRecord[]}
   */
  public apply(endpoint: Function): ParameterRecord[] {
    let params: ParameterRecord[] = [];
    const paramNames = getMethodParamNames(endpoint);

    for (const paramName of paramNames) {
      const index = paramNames.indexOf(paramName);
      let param: ParameterRecord = {
        name: paramName,
        validators: {
          required: this[requiredSymbol].get(index),
          email: this[emailSymbol].get(index),
          pattern: this[patternSymbol].get(index),
          minlength: this[minlengthSymbol].get(index),
        },
      };
      params.push(param);
    }

    this.clear();
    return params;
  }


  /**
   * Clears parameter registers.
   */
  private clear(): void {
    this[requiredSymbol].clear();
    this[emailSymbol].clear();
    this[patternSymbol].clear();
    this[minlengthSymbol].clear();
  }
}