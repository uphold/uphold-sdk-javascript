import SDK from '../../../src/core';

describe('AccountActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('getAccount()', () => {
    it('should make a request to `GET /me/accounts/:accountId`', () => {
      return sdk.getAccount('bar', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/accounts/bar', { qux: 'qix' });
        });
    });
  });

  describe('getAccounts()', () => {
    it('should make a request to `GET /me/accounts`', () => {
      return sdk.getAccounts({ qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/accounts', { qux: 'qix' });
        });
    });
  });
});
