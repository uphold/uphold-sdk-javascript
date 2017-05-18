import { BaseError } from '../../../src/core';
import StandardError from 'standard-error';

describe('BaseError', () => {
  describe('constructor()', () => {
    it('should inherit from `StandardError`', () => {
      expect(new BaseError()).toBeInstanceOf(StandardError);
    });
  });
});
