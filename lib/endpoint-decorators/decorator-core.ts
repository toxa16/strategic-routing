import {ParameterRecord} from '../types/parameter-record';
import {EndpointRecord} from '../types/endpoint-record';
import ParameterRegister from '../types/parameter-register';
import EndpointRegister from '../types/endpoint-register';


/**
 * Endpoint decorator core function.
 * @param target
 * @param methodName
 * @param endpointRegister
 * @param parameterRegister
 * @param route
 */
export default function decoratorCore(
    target: Object|Function,
    methodName: string,
    endpointRegister: EndpointRegister,
    parameterRegister: ParameterRegister,
    route: string
): void {

  // TODO: logging
  console.log(`${endpointRegister.httpMethodName} endpoint '${methodName}':`);
  console.log(`route: ${route}`);


  //
  // CHECKING FOR THE SAME ROUTE
  //
  const rec1 = endpointRegister.findByRoute(route);
  if (rec1 && rec1.name !== methodName) {
    throw new Error(`Different endpoints have the same route ` +
        `${route} for "${endpointRegister.httpMethodName}" method.`);
  }


  //
  // CHECKING FOR THE SAME ENDPOINT NAME
  //
  const rec = endpointRegister.findEndpoint(methodName);
  if (rec) {

    if (!endpointRegister.addRoute(methodName, route)) {
      // TODO: do not show warning for tests
      console.warn(
          `Warning: Endpoint "${methodName}" has duplicate ` +
          `@${endpointRegister.httpMethodName}() decorator ` +
          `with the same route "${route}".`);
    }


  } else {


    //
    // PRIMARY ENDPOINT REGISTRATION LOGIC
    //
    const params: ParameterRecord[] =
        parameterRegister.apply((target[methodName]));
    console.log(params);

    const endpointRecord: EndpointRecord = {
      name: methodName,
      routes: [route],
      parameters: params,
    };
    //endpointRegister.register(endpointRecord);

  }


  console.log('\n');
}
