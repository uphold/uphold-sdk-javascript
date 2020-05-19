import { BaseError } from './base';

export class UnauthorizedError extends BaseError {

  static hasError({ body, status } = {}) {
    if (!status || (!body || !body.error)) {
      return false;
    }

    if (status === 400 && (body.error === 'invalid_request' || body.error === 'invalid_grant')) {
      return true;
    }

    if (status === 401 && body.error === 'invalid_token') {
      return true;
    }

    return false;
  }

  constructor() {
    super('unauthorized', ...arguments);
  }

}
