import {postRegisterOld} from './registers/post.register';
import {Application, Response} from 'express';
import {BadRequest, InternalServerError, Conflict} from './errors';
import {EndpointRecord} from './types/endpoint-record';
import {ParameterRecord} from './types/parameter-record';


/**
 * Applies POST endpoints of the service.
 * @param app Express application instance
 * @param service Target service instance
 */
export function applyPost(app: Application, service: Object): void {
  for (const endpoint of postRegisterOld) {
    app.post(endpoint.routes, (req, res: Response) => {

      try {
        const body: Object = req.body;
        const args = compileArguments(endpoint, body);
        const returned = service[endpoint.name](...args);
        sendResponse(returned, res);
      } catch (err) {
        sendError(err, res);
      }

    });
  }

  // TODO: clear POST registry
}


/**
 * Returns an array of endpoint arguments from HTTP body.
 * While processing arguments validates them, if validation
 * is not passed, throws appropriate HttpError.
 * @param endpoint
 * @param body
 * @returns {Array}
 * @throws BadRequest
 */
function compileArguments(endpoint: EndpointRecord, body: Object): any[] {
  let args: any[] = [];
  validate(endpoint, body);
  for (const param of endpoint.parameters) {
    const arg = body[param.name];
    args.push(arg);
  }
  return args;
}


/**
 * Validates arguments towards existing rules (required, pattern).
 * If validation fails, throws BadRequest.
 * @param endpoint
 * @param body
 * @throws BadRequest
 */
function validate(endpoint: EndpointRecord, body: Object) {
  let errors = {};
  for (const param of endpoint.parameters) {
    const arg = body[param.name];
    const error = checkRequired(param, arg) ||
      checkPattern(param, arg) || checkMinLength(param, arg);
    if (error !== null) {
      errors[param.name] = error;
    }
  }

  if (Object.keys(errors).length != 0) {
    throw new BadRequest(errors);
  }
}


/**
 * Required argument validator.
 * @param parameter
 * @param argument
 * @returns {Object|null}
 */
function checkRequired(parameter: ParameterRecord, argument: any): Object | null {
  let error = null;
  if (parameter.required && !argument) {
    error = {
      type: 'required',
      message: `'${parameter.name}' is required.`,
    };
  }
  return error;
}


/**
 * Pattern argument validator.
 * @param parameter
 * @param argument
 * @returns {Object|null}
 */
function checkPattern(parameter: ParameterRecord, argument: any): Object | null {
  let error = null;
  if (parameter.pattern && !parameter.pattern.test(argument)) {
    error = {
      type: 'pattern',
      value: parameter.pattern.toString(),
      message: `'${argument}' doesn't match pattern ${parameter.pattern}`,
    }
  }
  return error;
}


/**
 * Min length argument validator.
 * @param parameter
 * @param argument
 * @returns {Object | null}
 */
function checkMinLength(parameter: ParameterRecord, argument: any): Object | null {
  let error = null;
  if (parameter.minLength && argument.length < parameter.minLength) {
    error = {
      type: 'minLength',
      value: parameter.minLength,
      message: `'${parameter.name}' must be at least ${parameter.minLength} characters long.`,
    }
  }
  return error;
}


/**
 * Sends an HTTP response of a given value via Express Response object.
 * The value may be a Promise or not. 
 * @param value A value to send via HTTP
 * @param res Response object of Express app.
 */
function sendResponse(value: any | Promise<any>, res: Response): void {
  if (value instanceof Promise) {
    value
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        sendError(err, res);
      });
  } else {
    res.json(value);
  }
}


/**
 * Sends an HTTP error via Express Response object.
 * @param err Error occurred
 * @param res Express Response object
 */
function sendError(err: Error, res: Response) {
  if (err instanceof BadRequest) {
    res.status(400).json(err.toJson());
  } else if (err instanceof Conflict) {
    res.status(409).json(err.toJson());
  } else {
    console.error(err);
    res.status(500).json((new InternalServerError()).toJson());
  }
}
