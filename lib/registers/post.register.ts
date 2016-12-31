import {EndpointRecord} from '../types/endpoint-record';
import EndpointRegister from '../types/endpoint-register';


/**
 * POST endpoint register (deprecated).
 * @type {Array}
 * @deprecated
 */
export let postRegisterOld: EndpointRecord[] = [];


/**
 * POST endpoint register.
 * @type {EndpointRegister}
 */
let postRegister: EndpointRegister = new EndpointRegister('post');
export default postRegister;