import { ForbiddenError } from '../../../src/core';

describe('ForbiddenError', () => {
  describe('hasError()', () => {
    it('should return true if response status is 403', () => {
      expect(ForbiddenError.hasError({ status: 403 })).toBe(true);
    });

    it('should return false if response status is not 403', () => {
      expect(ForbiddenError.hasError({ status: 'foo' })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `forbidden` message and given properties', () => {
      const error = new ForbiddenError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('forbidden');
    });
  });
});
