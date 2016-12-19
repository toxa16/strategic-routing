import {requiredSymbol} from '../symbols/required.symbol';
import {emailSymbol} from '../symbols/email.symbol';
import {patternSymbol} from '../symbols/pattern.symbol';
import {minlengthSymbol} from '../symbols/minlength.symbol';


export class ParameterRegister {

  constructor() {
    this[requiredSymbol] = new Map<number, boolean>();
    this[emailSymbol] = new Map<number, boolean>();
    this[patternSymbol] = new Map<number, RegExp>();
    this[minlengthSymbol] = new Map<number, number>();
  }


  register(decoratorSymbol: symbol, index: number, value: any): void {
    if (this[decoratorSymbol].has(index)) {
      throw new Error(
          `Multiple @${Symbol.keyFor(decoratorSymbol)} decorators ` +
          `on the same property.`);
    }
    this[decoratorSymbol].set(index, value);
  }


  apply(index: number): {validators: any} {
    const validators = {
      required: this[requiredSymbol].get(index),
      email: this[emailSymbol].get(index),
      pattern: this[patternSymbol].get(index),
      minlength: this[minlengthSymbol].get(index),
    };

    return {
      validators: validators,
    };
  }


  clear(): void {
    this[requiredSymbol].clear();
    this[emailSymbol].clear();
    this[patternSymbol].clear();
    this[minlengthSymbol].clear();
  }
}