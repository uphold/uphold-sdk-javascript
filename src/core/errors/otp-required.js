import { BaseError } from './base';
import includes from 'lodash/includes';

export class OTPRequiredError extends BaseError {

  static hasError({ headers } = {}) {
    if (!headers || !headers['otp-token']) {
      return false;
    }

    return includes(['OPTIONAL', 'REQUIRED'], headers['otp-token'].toUpperCase());
  }

  constructor() {
    super('otp_required', ...arguments);
  }

}
