import {EndpointRecord} from './types/endpoint-record';


/**
 * Required parameter register.
 * @type {Array}
 */
export let requiredRegister: number[] = [];


/**
 * Pattern parameter register.
 * @type {Map<number, RegExp>}
 */
export let patternRegister: Map<number, RegExp> =
    new Map<number, RegExp>();


/**
 * Min length parameter register.
 * @type {Map<number, number>}
 */
export let minLengthRegister: Map<number, number> =
    new Map<number, number>();



/**
 * POST endpoint register.
 * @type {Array}
 */
export let postRegister: EndpointRecord[] = [];