import { UnauthorizedError } from '../../../src/core';

describe('UnauthorizedError', () => {
  describe('hasError()', () => {
    it('should return false if response has no status or body error', () => {
      expect(UnauthorizedError.hasError()).toBe(false);
      expect(UnauthorizedError.hasError({ status: 'foo' })).toBe(false);
      expect(UnauthorizedError.hasError({ body: 'foo', status: 'bar' })).toBe(false);
    });

    it('should return true if response status is 400 and error code is `invalid_grant` or `invalid_request`', () => {
      expect(UnauthorizedError.hasError({ body: { error: 'invalid_grant' }, status: 400 })).toBe(true);
      expect(UnauthorizedError.hasError({ body: { error: 'invalid_request' }, status: 400 })).toBe(true);
    });

    it('should return true if response status is 401 and error code is `invalid_token`', () => {
      expect(UnauthorizedError.hasError({ body: { error: 'invalid_token' }, status: 401 })).toBe(true);
    });

    it('should return false if response status is 400 or 401 and error code is unexpected', () => {
      expect(UnauthorizedError.hasError({ body: { error: 'foo' }, status: 400 })).toBe(false);
      expect(UnauthorizedError.hasError({ body: { error: 'foo' }, status: 401 })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `unauthorized` message and given properties', () => {
      const error = new UnauthorizedError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('unauthorized');
    });
  });
});
