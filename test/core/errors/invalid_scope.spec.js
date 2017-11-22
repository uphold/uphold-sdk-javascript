import { InvalidScopeError } from '../../../src/core';

describe('InvalidScopeError', () => {
  describe('hasError()', () => {
    it('should return true if response status is 400 and error code is `invalid_scope`', () => {
      expect(InvalidScopeError.hasError({ body: { error: 'invalid_scope' }, status: 400 })).toBe(true);
    });

    it('should return false if response does not contain a `invalid_scope` code', () => {
      expect(InvalidScopeError.hasError({ body: { error: 'foo' }, status: 400 })).toBe(false);
    });

    it('should return false if response status is not 400', () => {
      expect(InvalidScopeError.hasError({ body: { error: 'invalid_scope' }, status: 401 })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `invalid_scope` message and given properties', () => {
      const error = new InvalidScopeError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('invalid_scope');
    });
  });
});
