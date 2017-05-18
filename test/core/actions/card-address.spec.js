import SDK from '../../../src/core';

describe('CardAddressActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('createCardAddress()', () => {
    it('should make a request to `POST /me/cards/:cardId/addresses`', () => {
      return sdk.createCardAddress('bar', 'biz', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/addresses', { body: { network: 'biz' }, method: 'post', qux: 'qix' });
        });
    });
  });

  describe('getCardAddresses()', () => {
    it('should make a request to `GET /me/cards/:cardId/addresses`', () => {
      return sdk.getCardAddresses('bar', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar/addresses', { qux: 'qix' });
        });
    });
  });
});
