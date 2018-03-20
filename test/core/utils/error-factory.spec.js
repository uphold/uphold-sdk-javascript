import {
  ForbiddenError,
  InternalServerError,
  InvalidScopeError,
  NotFoundError,
  OTPRequiredError,
  RateLimitError,
  UnauthorizedError,
  UnavailableError,
  UnknownError,
  ValidationFailedError,
  createError
} from '../../../src/core';

describe('ErrorFactory', () => {
  describe('createError()', () => {
    it('should create a `ForbiddenError`', () => {
      expect(createError({ status: 403 })).toBeInstanceOf(ForbiddenError);
    });

    it('should create an `InternalServerError`', () => {
      expect(createError({ status: 500 })).toBeInstanceOf(InternalServerError);
    });

    it('should create an `InvalidScopeError`', () => {
      expect(createError({ body: { error: 'invalid_scope' }, status: 400 })).toBeInstanceOf(InvalidScopeError);
    });

    it('should create a `NotFoundError`', () => {
      expect(createError({ status: 404 })).toBeInstanceOf(NotFoundError);
    });

    it('should create an `OTPRequiredError`', () => {
      expect(createError({ headers: { 'otp-token': 'required' } })).toBeInstanceOf(OTPRequiredError);
    });

    it('should create a `RateLimitError`', () => {
      expect(createError({ status: 429 })).toBeInstanceOf(RateLimitError);
    });

    it('should create an `UnauthorizedError`', () => {
      expect(createError({ body: { error: 'invalid_request' }, status: 400 })).toBeInstanceOf(UnauthorizedError);
    });

    it('should create an `UnavailableError`', () => {
      expect(createError({ status: -1 })).toBeInstanceOf(UnavailableError);
    });

    it('should create an `UnknownError`', () => {
      expect(createError()).toBeInstanceOf(UnknownError);
    });

    it('should create a `ValidationFailedError`', () => {
      expect(createError({ body: { code: 'validation_failed' } })).toBeInstanceOf(ValidationFailedError);
    });

    it('should create add an `response` attribute when provided', () => {
      const error = createError({ status: 403 }, { foo: 'bar' });

      expect(error).toBeInstanceOf(ForbiddenError);
      expect(error.response).toEqual({ foo: 'bar' });
    });
  });
});
