import SDK from '../../../src/core';

describe('CardTransactionActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
    sdk.paginate = jest.fn(() => Promise.resolve('bar'));
  });

  describe('cancelCardTransaction()', () => {
    it('should make a request to `POST /me/cards/:cardId/transactions/:transactionId/cancel`', () => {
      return sdk.cancelCardTransaction('bar', 'biz', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/transactions/biz/cancel', { method: 'post', qux: 'qix' });
        });
    });
  });

  describe('commitCardTransaction()', () => {
    it('should make a request to `POST /me/cards/:cardId/transactions/:transactionId/commit`', () => {
      return sdk.commitCardTransaction('bar', 'biz', { message: 'baz', securityCode: 'buz' }, false, { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/transactions/biz/commit', {
            body: {
              message: 'baz',
              securityCode: 'buz'
            },
            method: 'post',
            qux: 'qix'
          });
        });
    });

    it('should make a request to `POST /me/cards/:cardId/transactions/:transactionId/commit` with otp', () => {
      return sdk.commitCardTransaction('baz', 'bez', { message: 'biz', securityCode: 'boz' }, 'buz', { headers: { qux: 'qix' } })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/baz/transactions/bez/commit', {
            body: {
              message: 'biz',
              securityCode: 'boz'
            },
            headers: {
              'otp-token': 'buz',
              qux: 'qix'
            },
            method: 'post'
          });
        });
    });
  });

  describe('createCardTransaction()', () => {
    it('should make a request to `POST /me/cards/:cardId/transactions`', () => {
      return sdk.createCardTransaction('bar', { amount: 'biz', currency: 'baz', destination: 'qax', message: 'buz', origin: 'bad', securityCode: 'bez' }, false, false, { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/transactions', {
            body: {
              denomination: {
                amount: 'biz',
                currency: 'baz'
              },
              destination: 'qax',
              message: 'buz',
              origin: 'bad',
              securityCode: 'bez'
            },
            method: 'post',
            qux: 'qix'
          });
        });
    });

    it('should make a request to `POST /me/cards/:cardId/transactions` with commit query paramameter', () => {
      return sdk.createCardTransaction('bar', { amount: 'biz', currency: 'baz', destination: 'qax', message: 'buz', securityCode: 'bez' }, true, false, { queryParams: { qux: 'qix' } })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/transactions', {
            body: {
              denomination: {
                amount: 'biz',
                currency: 'baz'
              },
              destination: 'qax',
              message: 'buz',
              securityCode: 'bez'
            },
            method: 'post',
            queryParams: {
              commit: true,
              qux: 'qix'
            }
          });
        });
    });

    it('should make a request to `POST /me/cards/:cardId/transactions` with otp', () => {
      return sdk.createCardTransaction('bar', { amount: 'baz', currency: 'bez', message: 'biz', securityCode: 'boz' }, false, 'buz', { headers: { qux: 'qix' } })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/transactions', {
            body: {
              denomination: {
                amount: 'baz',
                currency: 'bez'
              },
              message: 'biz',
              securityCode: 'boz'
            },
            headers: {
              'otp-token': 'buz',
              qux: 'qix'
            },
            method: 'post'
          });
        });
    });
  });

  describe('getCardTransactions()', () => {
    it('should make a request to `GET /me/cards/:cardId/transactions`', () => {
      return sdk.getCardTransactions('baz', 'bez', 'biz', 'boz')
        .then(result => {
          expect(result).toBe('bar');
          expect(sdk.paginate).toBeCalledWith('/me/cards/baz/transactions', 'bez', 'biz', 'boz');
        });
    });
  });

  describe('resendCardTransaction()', () => {
    it('should make a request to `POST /me/cards/:cardId/transactions/:transactionId/resend`', () => {
      return sdk.resendCardTransaction('bar', 'biz', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/transactions/biz/resend', { method: 'post', qux: 'qix' });
        });
    });
  });
});
