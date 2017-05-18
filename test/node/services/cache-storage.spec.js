import { CacheStorage } from '../../../src/node';

describe('CacheStorage', () => {
  describe('constructor()', () => {
    it('should initialize `cache` as an empty object if no arguments are provided', () => {
      expect(new CacheStorage().cache).toEqual({});
    });

    it('should initialize `cache` with given argument', () => {
      expect(new CacheStorage('foo').cache).toBe('foo');
    });
  });

  describe('getItem()', () => {
    it('should throw an error if no value is cached for given `key`', done => {
      new CacheStorage().getItem('foo')
        .catch(e => {
          expect(e.message).toBe('Item not found');
          done();
        });
    });

    it('should return cached value for given `key`', () => {
      return new CacheStorage({ foo: 'bar' }).getItem('foo')
        .then(value => {
          expect(value).toBe('bar');
        });
    });
  });

  describe('removeItem()', () => {
    it('should remove the cached value for given `key`', () => {
      const storage = new CacheStorage({ foo: 'bar' });

      return storage.removeItem('foo')
        .then(() => {
          expect(storage.cache.foo).toBeUndefined();
        });
    });
  });

  describe('setItem()', () => {
    it('should set given `value` for given uncached `key`', () => {
      const storage = new CacheStorage();

      return storage.setItem('foo', 'bar')
        .then(() => {
          expect(storage.cache.foo).toBe('bar');
        });
    });

    it('should override cached value for given `key` with given `value`', () => {
      const storage = new CacheStorage({ foo: 'bar' });

      return storage.setItem('foo', 'biz')
        .then(() => {
          expect(storage.cache.foo).toBe('biz');
        });
    });
  });
});
