import { InternalServerError } from '../../../src/core';

describe('InternalServerError', () => {
  describe('hasError()', () => {
    it('should return true if response status is 500', () => {
      expect(InternalServerError.hasError({ status: 500 })).toBe(true);
    });

    it('should return false if response status is not 500', () => {
      expect(InternalServerError.hasError({ status: 'foo' })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `internal_server` message and given properties', () => {
      const error = new InternalServerError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('internal_server');
    });
  });
});
