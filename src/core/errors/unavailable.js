import { BaseError } from './base';

export class UnavailableError extends BaseError {

  static hasError({ status } = {}) {
    return status <= 0;
  }

  constructor() {
    super('unavailable', ...arguments);
  }

}
