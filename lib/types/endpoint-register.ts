import {EndpointRecord} from './endpoint-record';
import * as _ from 'lodash';


/**
 * Endpoint register general class.
 */
export class EndpointRegister {
  private _records: EndpointRecord[] = [];
  readonly httpMethodName;


  /**
   * Class constructor.
   * @param httpMethodName
   * @param capitalize
   */
  constructor(httpMethodName?: string, capitalize: boolean = true) {
    const name = capitalize ?
        _.capitalize(httpMethodName) : httpMethodName;
    this.httpMethodName = name || 'Untyped';
  }


  /**
   * Registers new endpoint record
   * @param record
   */
  register(record: EndpointRecord): void {
    this._records.push(record);
  }


  /**
   * Finds a record by endpoint name.
   * @param methodName
   * @returns {EndpointRecord}
   */
  findByName(methodName: string): EndpointRecord {
    return _.find(this._records, ['name', methodName]);
  }


  /**
   * Finds a record that contains given route.
   * @param route
   * @returns {EndpointRecord}
   */
  findByRoute(route: string): EndpointRecord {
    return _.find(this._records, function (o) {
      return o.routes.includes(route);
    });
  }


  /**
   *
   * @param methodName
   * @param route
   * @throws Error
   */
  addRoute(methodName: string, route: string): boolean {
    const rec = this.findByName(methodName);
    if (!rec.routes.includes(route)) {
      rec.routes.push(route);
      return true;
    } else {
      return false;
    }
  }


  /**
   * Returns a copy of register's endpoint records array.
   * @returns {EndpointRecord[]}
   */
  get records(): EndpointRecord[] {
    return this._records.slice();
  }


  /**
   * Clears register.
   */
  clear(): void {
    this._records.length = 0;
  }
}
