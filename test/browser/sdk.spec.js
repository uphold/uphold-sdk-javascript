import BrowserSDK, { CookieStorage, FetchClient } from '../../src/browser';
import SDK from '../../src/core';

describe('Browser SDK', () => {
  describe('constructor()', () => {
    it('should inherit from `SDK`', () => {
      expect(new BrowserSDK({ clientId: 'foo', clientSecret: 'bar' })).toBeInstanceOf(SDK);
    });

    it('should set `client` as an instance of `FetchClient`', () => {
      expect(new BrowserSDK({ clientId: 'foo', clientSecret: 'bar' }).client).toBeInstanceOf(FetchClient);
    });

    it('should set `storage` as an instance of `CookieClient`', () => {
      expect(new BrowserSDK({ clientId: 'foo', clientSecret: 'bar' }).storage).toBeInstanceOf(CookieStorage);
    });
  });
});
