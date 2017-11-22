import { AuthorizationRequiredError } from './authorization-required';
import { BaseError } from './base';
import { ForbiddenError } from './forbidden';
import { InternalServerError } from './internal-server';
import { InvalidScopeError } from './invalid-scope';
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
  InvalidScopeError,
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
  InvalidScopeError,
  NotFoundError,
  OTPRequiredError,
  RateLimitError,
  UnauthorizedError,
  UnavailableError,
  ValidationFailedError,
  UnknownError
];
