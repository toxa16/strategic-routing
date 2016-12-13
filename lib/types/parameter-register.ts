/**
 * Parameter register general class.
 */
export class ParameterRegister<T> {

  private _map: Map<number, T> = new Map<number, T>();

  register(index: number, argument: T): void {
    this._map.set(index, argument);
  }

  has(index: number): boolean {
    return this._map.has(index);
  }

  size(): number {
    return this._map.size;
  }

  apply(index: number): T {
    return this._map.get(index) || null;
  }

  clear(): void {
    this._map.clear();
  }
}