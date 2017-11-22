import { BaseError } from './base';

export class InvalidScopeError extends BaseError {
  static hasError({ body, status } = {}) {
    if (!status || (!body || !body.error)) {
      return false;
    }

    if (status === 400 && body.error === 'invalid_scope') {
      return true;
    }

    return false;
  }

  constructor() {
    super('invalid_scope', ...arguments);
  }
}
