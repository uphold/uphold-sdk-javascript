import { AuthorizationRequiredError } from '../../../src/core';

describe('AuthorizationRequiredError', () => {
  describe('constructor()', () => {
    it('should set `authorization_required` message and given properties', () => {
      const error = new AuthorizationRequiredError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('authorization_required');
    });
  });
});
