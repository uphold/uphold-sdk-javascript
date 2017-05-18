import { BaseError } from './base';

export class ValidationFailedError extends BaseError {
  static hasError({ body } = {}) {
    return body && body.code === 'validation_failed';
  }

  constructor() {
    super('validation_failed', ...arguments);
  }
}
