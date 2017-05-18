import SDK from '../../../src/core';

describe('TickerActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('getTicker()', () => {
    it('should make a request to `GET /ticker` with no pair', () => {
      return sdk.getTicker(false, { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/ticker', { authenticate: false, qux: 'qix' });
        });
    });

    it('should make a request to `GET /ticker/:pair` with pair', () => {
      sdk.getTicker('bar')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/ticker/bar', { authenticate: false });
        });
    });
  });
});
