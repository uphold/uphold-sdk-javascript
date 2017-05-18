import { UnknownError } from '../../../src/core';

describe('UnknownError', () => {
  describe('hasError()', () => {
    it('should return true', () => {
      expect(UnknownError.hasError()).toBe(true);
    });
  });

  describe('constructor()', () => {
    it('should set `unknown` message and given properties', () => {
      const error = new UnknownError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('unknown');
    });
  });
});
