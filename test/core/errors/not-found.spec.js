import { NotFoundError } from '../../../src/core';

describe('NotFoundError', () => {
  describe('hasError()', () => {
    it('should return true if response status is 404', () => {
      expect(NotFoundError.hasError({ status: 404 })).toBe(true);
    });

    it('should return false if response status is not 404', () => {
      expect(NotFoundError.hasError({ status: 'foo' })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `not_found` message and given properties', () => {
      const error = new NotFoundError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('not_found');
    });
  });
});
