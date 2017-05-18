import { ValidationFailedError } from '../../../src/core';

describe('ValidationFailedError', () => {
  describe('hasError()', () => {
    it('should return true if response contains a `validation_failed` code', () => {
      expect(ValidationFailedError.hasError({ body: { code: 'validation_failed' } })).toBe(true);
    });

    it('should return false if response does not contain a `validation_failed` code', () => {
      expect(ValidationFailedError.hasError({ body: { code: 'foo' } })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `validation_failed` message and given properties', () => {
      const error = new ValidationFailedError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('validation_failed');
    });
  });
});
