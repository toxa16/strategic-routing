import {EndpointRegister} from '../types/endpoint-register';
import {ParameterRecord} from '../types/parameter-record';
import {EndpointRecord} from '../types/endpoint-record';
import {recordParameters} from '../helpers/record-parameters';


/**
 * Endpoint decorator core function.
 * @param target
 * @param methodName
 * @param register
 * @param route
 */
export function decoratorCore(
    target: Object|Function,
    methodName: string,
    register: EndpointRegister,
    route: string
): void {

  // TODO: logging
  console.log(`${register.httpMethodName} endpoint '${methodName}':`);
  console.log(`route: ${route}`);


  const rec1 = register.findByRoute(route);
  if (rec1 && rec1.name !== methodName) {
    throw new Error(`Different endpoints have the same route ` +
        `${route} for "${register.httpMethodName}" method.`);
  }


  const rec = register.findByName(methodName);

  if (rec) {

    if (!register.addRoute(methodName, route)) {
      // TODO: do not show warning for tests
      console.warn(
          `Warning: Endpoint "${methodName}" has duplicate ` +
          `@${register.httpMethodName}() decorator ` +
          `with the same route "${route}".`);
    }


  } else {

    const params: ParameterRecord[] =
        recordParameters(target[methodName]);
    console.log(params);

    const endpointRecord: EndpointRecord = {
      name: methodName,
      routes: [route],
      parameters: params,
    };
    register.register(endpointRecord);

  }


  //throw new Error();


  console.log('\n');
}
