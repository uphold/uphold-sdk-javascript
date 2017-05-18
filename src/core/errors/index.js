import { AuthorizationRequiredError } from './authorization-required';
import { BaseError } from './base';
import { ForbiddenError } from './forbidden';
import { InternalServerError } from './internal-server';
import { NotFoundError } from './not-found';
import { OTPRequiredError } from './otp-required';
import { RateLimitError } from './rate-limit';
import { UnauthorizedError } from './unauthorized';
import { UnavailableError } from './unavailable';
import { UnknownError } from './unknown';
import { ValidationFailedError } from './validation-failed';

export {
  AuthorizationRequiredError,
  BaseError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  OTPRequiredError,
  RateLimitError,
  UnauthorizedError,
  UnavailableError,
  UnknownError,
  ValidationFailedError
};

export default [
  AuthorizationRequiredError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  OTPRequiredError,
  RateLimitError,
  UnauthorizedError,
  UnavailableError,
  ValidationFailedError,
  UnknownError
];
