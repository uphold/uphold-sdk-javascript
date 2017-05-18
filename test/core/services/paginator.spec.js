import { Paginator } from '../../../src/core';

describe('Paginator', () => {
  describe('constructor()', () => {
    it('should set given `sdk`, `uri`, `itemsPerPage` and `options`', () => {
      const paginator = new Paginator('foo', 'bar', 'biz', 'baz');

      expect(paginator.itemsPerPage).toBe('biz');
      expect(paginator.options).toBe('baz');
      expect(paginator.sdk).toBe('foo');
      expect(paginator.uri).toBe('bar');
    });
  });

  describe('getNextPage()', () => {
    const paginator = new Paginator();

    beforeEach(() => {
      paginator.getPage = jest.fn();
      paginator.hasNextPage = jest.fn();
    });

    it('should return `undefined` if there is no next page', () => {
      paginator.hasNextPage.mockReturnValue(false);

      paginator.getNextPage()
        .then(result => {
          expect(result).toBeUndefined();
        });
    });

    it('should return the next page', () => {
      paginator.currentPage = 1;

      paginator.hasNextPage.mockReturnValue(true);
      paginator.getPage.mockReturnValue(Promise.resolve('foo'));

      return paginator.getNextPage('bar')
        .then(result => {
          expect(paginator.getPage).toBeCalledWith(2, 'bar');
          expect(result).toBe('foo');
        });
    });
  });

  describe('getPage()', () => {
    it('should build the `Range` header based on given `page` and `itemsPerPage`', () => {
      const api = jest.fn(() => Promise.resolve({ headers: { 'content-range': 'items */0' } }));

      return new Paginator({ api }, 'foo', 3)
        .getPage(2)
        .then(() => {
          expect(api).toBeCalledWith('foo', { headers: { range: 'items=3-5' }, raw: true });
        });
    });

    it('should send instance `options`', () => {
      const api = jest.fn(() => Promise.resolve({ headers: { 'content-range': 'items */0' } }));

      return new Paginator({ api }, 'foo', 3, { headers: { range: 'bar' } })
        .getPage(2)
        .then(() => {
          expect(api).toBeCalledWith('foo', { headers: { range: 'bar' }, raw: true });
        });
    });

    it('should send given `options`', () => {
      const api = jest.fn(() => Promise.resolve({ headers: { 'content-range': 'items */0' } }));

      return new Paginator({ api }, 'foo', 3, { headers: { range: 'bar' } })
        .getPage(2, { headers: { range: 'biz' } })
        .then(() => {
          expect(api).toBeCalledWith('foo', { headers: { range: 'biz' }, raw: true });
        });
    });

    it('should not override the `raw` option', () => {
      const api = jest.fn(() => Promise.resolve({ headers: { 'content-range': 'items */0' } }));

      return new Paginator({ api }, 'foo', 3)
        .getPage(2, { raw: 'bar' })
        .then(() => {
          expect(api).toBeCalledWith('foo', { headers: { range: 'items=3-5' }, raw: true });
        });
    });

    it('should return a paginator', () => {
      const api = jest.fn(() => Promise.resolve({ headers: { 'content-range': 'items */0' } }));

      return new Paginator({ api })
        .getPage()
        .then(paginator => {
          expect(paginator).toBeInstanceOf(Paginator);
        });
    });

    it('should return a paginator at the first page if no page is provided', () => {
      const api = jest.fn(() => Promise.resolve({
        body: 'bar',
        headers: {
          'content-range': 'items 0-2/11'
        }
      }));

      return new Paginator({ api }, 'foo', 3)
        .getPage()
        .then(paginator => {
          expect(paginator.currentPage).toBe(1);
          expect(paginator.headers).toEqual({ 'content-range': 'items 0-2/11' });
          expect(paginator.items).toBe('bar');
          expect(paginator.itemsCount).toBe(11);
          expect(paginator.itemsPerPage).toBe(3);
          expect(paginator.pagesCount).toBe(4);
        });
    });

    it('should return a paginator at given page', () => {
      const api = jest.fn(() => Promise.resolve({
        body: 'bar',
        headers: {
          'content-range': 'items 3-5/11'
        }
      }));

      return new Paginator({ api }, 'foo', 3)
        .getPage(2)
        .then(paginator => {
          expect(paginator.currentPage).toBe(2);
          expect(paginator.headers).toEqual({ 'content-range': 'items 3-5/11' });
          expect(paginator.items).toBe('bar');
          expect(paginator.itemsCount).toBe(11);
          expect(paginator.itemsPerPage).toBe(3);
          expect(paginator.pagesCount).toBe(4);
        });
    });

    it('should return a paginator with empty pagination response', () => {
      const api = jest.fn(() => Promise.resolve({
        body: [],
        headers: {
          'content-range': 'items */0'
        }
      }));

      return new Paginator({ api }, 'foo', 3)
        .getPage(2)
        .then(paginator => {
          expect(paginator.currentPage).toBeNull();
          expect(paginator.headers).toEqual({ 'content-range': 'items */0' });
          expect(paginator.items).toEqual([]);
          expect(paginator.itemsCount).toBe(0);
          expect(paginator.itemsPerPage).toBe(3);
          expect(paginator.pagesCount).toBe(0);
        });
    });
  });

  describe('getPreviousPage()', () => {
    const paginator = new Paginator();

    beforeEach(() => {
      paginator.getPage = jest.fn();
      paginator.hasPreviousPage = jest.fn();
    });

    it('should return `undefined` if there is no previous page', () => {
      paginator.hasPreviousPage.mockReturnValue(false);

      return paginator.getPreviousPage()
        .then(result => {
          expect(result).toBeUndefined();
        });
    });

    it('should return the previous page', () => {
      paginator.currentPage = 2;

      paginator.hasPreviousPage.mockReturnValue(true);
      paginator.getPage.mockReturnValue(Promise.resolve('foo'));

      return paginator.getPreviousPage('bar')
        .then(result => {
          expect(paginator.getPage).toBeCalledWith(1, 'bar');
          expect(result).toBe('foo');
        });
    });
  });

  describe('hasNextPage()', () => {
    const paginator = new Paginator();

    it('should return `false` if pagination is empty', () => {
      expect(paginator.hasNextPage()).toBe(false);
    });

    it('should return `false` if current page is the last page', () => {
      paginator.currentPage = 1;
      paginator.pagesCount = 1;

      expect(paginator.hasNextPage()).toBe(false);
    });

    it('should return `true` if current page is not the last page', () => {
      paginator.currentPage = 1;
      paginator.pagesCount = 2;

      expect(paginator.hasNextPage()).toBe(true);
    });
  });

  describe('hasPreviousPage()', () => {
    const paginator = new Paginator();

    it('should return `false` if pagination is empty', () => {
      expect(paginator.hasPreviousPage()).toBe(false);
    });

    it('should return `false` if current page is the first page', () => {
      paginator.currentPage = 1;

      expect(paginator.hasPreviousPage()).toBe(false);
    });

    it('should return `true` if current page is not the first page', () => {
      paginator.currentPage = 2;

      expect(paginator.hasPreviousPage()).toBe(true);
    });
  });
});
