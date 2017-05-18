import SDK from '../../../src/core';

describe('PhoneActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('getPhones()', () => {
    it('should make a request to `GET /me/phones`', () => {
      return sdk.getPhones('bar')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/phones', 'bar');
        });
    });
  });
});
