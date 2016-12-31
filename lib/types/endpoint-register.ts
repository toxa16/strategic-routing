import {EndpointRecord} from './endpoint-record';
import * as _ from 'lodash';
import ParameterRegister from './parameter-register';


/**
 * Endpoint register general class.
 */
export default class EndpointRegister {

  private endpointRecords: EndpointRecord[] = [];
  //readonly httpMethodName;


  /**
   * Class constructor.
   * @param parameterRegister
   */
  constructor(private parameterRegister: ParameterRegister) {
    /*const name = capitalize ?
        _.capitalize(httpMethodName) : httpMethodName;
    this.httpMethodName = name || 'Untyped';*/
  }


  /**
   * Registers new endpoint record.
   * @param target
   * @param endpointName
   * @param route
   */
  public register(
      target: Object|Function,
      endpointName: string,
      route: string
  ): void {
    let record = this.findEndpoint(endpointName);
    if (!record) {
      record = this.addEndpoint(target, endpointName);
    }
  }



  public registerGet(
      target: Object|Function,
      endpointName: string,
      route: string
  ): void {}

  public registerPost(
      target: Object|Function,
      endpointName: string,
      route: string
  ): void {}

  public registerPut(
      target: Object|Function,
      endpointName: string,
      route: string
  ): void {}

  public registerDelete(
      target: Object|Function,
      endpointName: string,
      route: string
  ): void {}

  /**
   * Finds endpoint record by endpoint name.
   * @param endpointName
   * @returns {EndpointRecord}
   */
  private findEndpoint(endpointName: string): EndpointRecord {
    return _.find(this.endpointRecords, ['name', endpointName]);
  }


  private addEndpoint(
      target: Object|Function,
      name: string
  ): EndpointRecord {
    let endpoint: Function;
    if (target instanceof Function) {
      endpoint = target.prototype[name];
    } else {
      endpoint = target[name];
    }

    const params = this.parameterRegister.apply(endpoint);

    const record: EndpointRecord = {
      name: name,
      parameters: params,
    };

    this.endpointRecords.push(record);
    return record;
  }

  /**
   * Finds a record that contains given route.
   * @param route
   * @returns {EndpointRecord}
   */
  /*findByRoute(route: string): EndpointRecord {
    return _.find(this.endpoints, function (o) {
      return o.routes.includes(route);
    });
  }*/


  /**
   *
   * @param methodName
   * @param route
   * @throws Error
   */
  /*addRoute(methodName: string, route: string): boolean {
    const rec = this.findEndpoint(methodName);
    if (!rec.routes.includes(route)) {
      rec.routes.push(route);
      return true;
    } else {
      return false;
    }
  }*/


  /**
   * Returns a copy of register's endpoint records array.
   * @returns {EndpointRecord[]}
   */
  get records(): EndpointRecord[] {
    return this.endpointRecord.slice();
  }


  /**
   * Clears register.
   */
  clear(): void {
    this.endpointRecord.length = 0;
  }
}
