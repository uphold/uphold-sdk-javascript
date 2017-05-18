import SDK from '../../../src/core';

describe('TransactionActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
    sdk.paginate = jest.fn(() => Promise.resolve('bar'));
  });

  describe('.getTransaction()', () => {
    it('should make a request to `GET /me/transactions/:transactionId`', () => {
      return sdk.getTransaction('bar', 'biz')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/transactions/bar', 'biz');
        });
    });
  });

  describe('getTransactions()', () => {
    it('should make a request to `GET /me/transactions`', () => {
      return sdk.getTransactions('biz', 'baz', 'buz')
        .then(result => {
          expect(result).toBe('bar');
          expect(sdk.paginate).toBeCalledWith('/me/transactions', 'biz', 'baz', 'buz');
        });
    });
  });
});
