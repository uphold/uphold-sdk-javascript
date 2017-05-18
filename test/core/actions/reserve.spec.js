import SDK from '../../../src/core';

describe('ReserveActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
    sdk.paginate = jest.fn(() => Promise.resolve('bar'));
  });

  describe('getReserveTransactions()', () => {
    it('should make a request to `GET /reserve/transactions`', () => {
      return sdk.getReserveTransactions('foo', 'biz', 'baz')
        .then(result => {
          expect(result).toBe('bar');
          expect(sdk.paginate).toBeCalledWith('/reserve/transactions', 'foo', 'biz', 'baz');
        });
    });
  });

  describe('getReserveTransaction()', () => {
    it('should make a request to `GET /reserve/transactions/:transactionId`', () => {
      return sdk.getReserveTransaction('bar', 'baz')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/reserve/transactions/bar', 'baz');
        });
    });
  });

  describe('getReserveStatistics()', () => {
    it('should make a request to `GET /reserve/statistics`', () => {
      return sdk.getReserveStatistics({ qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/reserve/statistics', { authenticate: false, qux: 'qix' });
        });
    });
  });

  describe('getReserveLedger()', () => {
    it('should make a request to `GET /reserve/ledger`', () => {
      return sdk.getReserveLedger('foo', 'biz', 'baz')
        .then(result => {
          expect(result).toBe('bar');
          expect(sdk.paginate).toBeCalledWith('/reserve/ledger', 'foo', 'biz', 'baz');
        });
    });
  });
});
