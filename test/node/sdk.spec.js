import NodeSDK, { CacheStorage, RequestClient } from '../../src/node';
import SDK from '../../src/core';

describe('Node SDK', () => {
  describe('constructor()', () => {
    it('should inherit from `SDK`', () => {
      expect(new NodeSDK({ clientId: 'foo', clientSecret: 'bar' })).toBeInstanceOf(SDK);
    });

    it('should set `client` as an instance of `RequestClient`', () => {
      expect(new NodeSDK({ clientId: 'foo', clientSecret: 'bar' }).client).toBeInstanceOf(RequestClient);
    });

    it('should set `storage` as an instance of `CacheStorage`', () => {
      expect(new NodeSDK({ clientId: 'foo', clientSecret: 'bar' }).storage).toBeInstanceOf(CacheStorage);
    });
  });
});
