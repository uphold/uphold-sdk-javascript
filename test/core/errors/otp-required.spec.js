import { OTPRequiredError } from '../../../src/core';

describe('OTPRequiredError', () => {
  describe('hasError()', () => {
    it('should return true if response has `otp-token` header set to `required`', () => {
      expect(OTPRequiredError.hasError({ headers: { 'otp-token': 'required' } })).toBe(true);
    });

    it('should return false if response has not `otp-token` header set to `required`', () => {
      expect(OTPRequiredError.hasError({ headers: { 'otp-token': 'foo' } })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `otp_required` message and given properties', () => {
      const error = new OTPRequiredError({ foo: 'bar' });

      expect(error.foo).toBe('bar');
      expect(error.message).toBe('otp_required');
    });
  });
});
