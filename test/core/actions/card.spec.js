import SDK from '../../../src/core';

describe('CardActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
    sdk.paginate = jest.fn(() => Promise.resolve('bar'));
  });

  describe('createCard()', () => {
    it('should make a request to `POST /me/cards`', () => {
      return sdk.createCard('bar', 'biz', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards', { body: { currency: 'bar', label: 'biz' }, method: 'post', qux: 'qix' });
        });
    });
  });

  describe('getCard()', () => {
    it('should make a request to `GET /me/cards/:cardId`', () => {
      return sdk.getCard('bar', 'biz')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar', 'biz');
        });
    });
  });

  describe('getCards()', () => {
    it('should make a request to `GET /me/cards`', () => {
      return sdk.getCards('foo', 'biz', 'baz')
        .then(result => {
          expect(result).toBe('bar');
          expect(sdk.paginate).toBeCalledWith('/me/cards', 'foo', 'biz', 'baz');
        });
    });
  });

  describe('updateCard()', () => {
    it('should make a request to `PATCH /me/cards/:cardId`', () => {
      return sdk.updateCard('bar', 'biz', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/cards/bar', { body: { label: 'biz' }, method: 'patch', qux: 'qix' });
        });
    });
  });
});
