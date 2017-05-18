import { BaseError } from './base';

export class InternalServerError extends BaseError {
  static hasError({ status } = {}) {
    return status === 500;
  }

  constructor() {
    super('internal_server', ...arguments);
  }
}
