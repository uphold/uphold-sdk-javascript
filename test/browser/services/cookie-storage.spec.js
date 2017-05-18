import { CookieStorage } from '../../../src/browser';

describe('CookieStorage', () => {
  describe('constructor()', () => {
    it('should set the default `storageName`', () => {
      expect(new CookieStorage().storageName).toBe('_token');
    });

    it('should set given `storageName`', () => {
      expect(new CookieStorage('foo').storageName).toBe('foo');
    });

    it('should initialize an empty cache', () => {
      expect(new CookieStorage().cache).toEqual({});
    });
  });

  describe('getItem()', () => {
    let storage;

    beforeEach(() => {
      storage = new CookieStorage();

      storage._setCookie({});
    });

    it('should return a cached item', () => {
      storage._getCookie = jest.fn();
      storage.cache.foo = 'bar';

      return storage.getItem('foo')
        .then(result => {
          expect(result).toBe('bar');
          expect(storage._getCookie).not.toBeCalled();
        });
    });

    it('should reject if there is no cookies', done => {
      return new CookieStorage('').getItem('foo')
        .catch(done);
    });

    it('should reject if storage name is not stored', done => {
      return new CookieStorage('foo').getItem('bar')
        .catch(done);
    });

    it('should return a cookie stored item', () => {
      storage._setCookie({ foo: 'bar' });

      return storage.getItem('foo')
        .then(result => {
          expect(result).toBe('bar');
        });
    });

    it('should cache a cookie stored item', () => {
      storage._setCookie({ foo: 'bar' });

      return storage.getItem('foo')
        .then(() => {
          expect(storage.cache.foo).toBe('bar');
        });
    });

    it('should reject if an item is not stored', done => {
      return storage.getItem('foo')
        .catch(() => done());
    });
  });

  describe('setItem()', () => {
    let storage;

    beforeEach(() => {
      storage = new CookieStorage();
    });

    it('should delete a cached item', () => {
      storage._setCookie({ foo: 'bar' });

      return storage.setItem('foo', 'biz')
        .then(() => {
          expect(storage.cache).toEqual({});
        });
    });

    it('should update the cookie storage', () => {
      storage._setCookie({ foo: 'bar' });

      return storage.setItem('foo', 'biz')
        .then(() => {
          expect(storage._getCookie()).toEqual({ foo: 'biz' });
        });
    });
  });

  describe('removeItem()', () => {
    let storage;

    beforeEach(() => {
      storage = new CookieStorage();

      storage._setCookie({});
    });

    it('should handle non-existent items', () => {
      storage._setCookie = jest.fn();

      return storage.removeItem('foo')
        .then(() => {
          expect(storage._setCookie).not.toBeCalled();
        });
    });

    it('should remove an item from cache', () => {
      storage._setCookie({ foo: 'bar' });

      storage.cache.foo = 'bar';

      return storage.removeItem('foo')
        .then(() => {
          expect(storage.cache.foo).toBeUndefined();
        });
    });

    it('should remove an item from cookie storage', () => {
      storage._setCookie({ foo: 'bar' });

      return storage.removeItem('foo')
        .then(() => {
          expect(storage._getCookie()).toEqual({});
        });
    });
  });
});
