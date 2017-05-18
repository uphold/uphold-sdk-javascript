import { BaseError } from './base';

export class ForbiddenError extends BaseError {
  static hasError({ status } = {}) {
    return status === 403;
  }

  constructor() {
    super('forbidden', ...arguments);
  }
}
