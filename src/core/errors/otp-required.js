import { BaseError } from './base';

export class OTPRequiredError extends BaseError {
  static hasError({ headers } = {}) {
    if (!headers || !headers['otp-token']) {
      return false;
    }

    return headers['otp-token'].toUpperCase() === 'REQUIRED';
  }

  constructor() {
    super('otp_required', ...arguments);
  }
}
