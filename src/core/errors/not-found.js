import { BaseError } from './base';

export class NotFoundError extends BaseError {
  static hasError({ status } = {}) {
    return status === 404;
  }

  constructor() {
    super('not_found', ...arguments);
  }
}
