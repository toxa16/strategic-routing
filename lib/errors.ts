/**
 * General HTTP error class.
 */
export abstract class HttpError extends Error {

  abstract readonly code;

  constructor(readonly errors?: Object) {
    super();
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
      errors: this.errors,
    };
  }
}


/**
 * BadRequest error class (400).
 */
export class BadRequest extends HttpError {
  readonly code: number = 400;
  readonly message = 'Bad Request';
}


/**
 * Conflict error class (409).
 */
export class Conflict extends HttpError {
  readonly code: number = 409;
  readonly message = 'Conflict';
}


/**
 * InternalServerError class (500).
 */
export class InternalServerError extends HttpError {
  readonly code: number = 500;
  readonly message = 'Internal Server Error';
}