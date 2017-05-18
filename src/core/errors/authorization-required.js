import { BaseError } from './base';

export class AuthorizationRequiredError extends BaseError {
  constructor() {
    super('authorization_required', ...arguments);
  }
}
