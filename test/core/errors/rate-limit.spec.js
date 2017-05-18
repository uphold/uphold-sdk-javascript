import { RateLimitError } from '../../../src/core';

describe('RateLimitError', () => {
  describe('hasError()', () => {
    it('should return true if response status is 429', () => {
      expect(RateLimitError.hasError({ status: 429 })).toBe(true);
    });

    it('should return false if response status is not 429', () => {
      expect(RateLimitError.hasError({ status: 'foo' })).toBe(false);
    });
  });

  describe('constructor()', () => {
    it('should set `rate_limit` message, rate limit data and given properties', () => {
      const error = new RateLimitError({
        foo: 'bar',
        headers: {
          qux: 'qix',
          'rate-limit-limit': 'biz',
          'rate-limit-remaining': 'baz',
          'rate-limit-reset': 'buz'
        }
      });

      expect(error.foo).toBe('bar');
      expect(error.limit).toBe('biz');
      expect(error.message).toBe('rate_limit');
      expect(error.remaining).toBe('baz');
      expect(error.headers.qux).toBe('qix');
      expect(error.reset).toBe('buz');
    });

    it('should not set rate limit data that is not present in headers', () => {
      const error = new RateLimitError({ headers: {} });

      expect(error.limit).toBeUndefined();
      expect(error.remaining).toBeUndefined();
      expect(error.reset).toBeUndefined();
    });
  });

  describe('getRateLimitData()', () => {
    it('should return rate limit data', () => {
      const error = new RateLimitError({
        headers: {
          'rate-limit-limit': 'foo',
          'rate-limit-remaining': 'bar',
          'rate-limit-reset': 'biz'
        }
      });

      expect(error.getRateLimitData()).toEqual({ limit: 'foo', remaining: 'bar', reset: 'biz' });
    });
  });
});
