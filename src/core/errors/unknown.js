import { BaseError } from './base';

export class UnknownError extends BaseError {
  static hasError() {
    return true;
  }

  constructor() {
    super('unknown', ...arguments);
  }
}
