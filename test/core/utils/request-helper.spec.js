import {
  buildBasicAuthorizationHeader,
  buildBearerAuthorizationHeader,
  buildBody,
  buildUrl
} from '../../../src/core';

describe('RequestHelper', () => {
  describe('buildBearerAuthorizationHeader()', () => {
    it('should return the token bearer', () => {
      expect(buildBearerAuthorizationHeader('foo')).toEqual({ authorization: 'Bearer foo' });
    });
  });

  describe('buildBasicAuthorizationHeader()', () => {
    it('should return the encoded token', () => {
      expect(buildBasicAuthorizationHeader('foo', 'bar')).toEqual({ authorization: 'Basic Zm9vOmJhcg==' });
    });

    it('should support unicode characters', () => {
      expect(buildBasicAuthorizationHeader('Я люблю́ ру́сский язы́к!', '😀')).toEqual({
        authorization: 'Basic 0K8g0LvRjtCx0LvRjsyBINGA0YPMgdGB0YHQutC40Lkg0Y/Qt9GLzIHQuiE68J+YgA=='
      });
    });
  });

  describe('buildBody()', () => {
    it('should stringify the data', () => {
      expect(buildBody({ foo: 'bar' })).toBe('foo=bar');
    });

    it('should return undefined for empty objects', () => {
      expect(buildBody({})).toBeUndefined();
    });
  });

  describe('buildUrl()', () => {
    it('should skip urls', () => {
      expect(buildUrl('http://foo.bar')).toBe('http://foo.bar');
    });

    it('should build versioned urls', () => {
      expect(buildUrl('biz', 'http://foo.bar', 'v0')).toBe('http://foo.bar/v0/biz');
    });

    it('should build unversioned urls', () => {
      expect(buildUrl('biz', 'http://foo.bar')).toBe('http://foo.bar/biz');
    });

    it('should handle leading slash in uris', () => {
      expect(buildUrl('/biz', 'http://foo.bar')).toBe('http://foo.bar/biz');
    });

    it('should handle query strings ', () => {
      expect(buildUrl('/biz', 'http://foo.bar', 'v0', { qux: 'qix' })).toBe('http://foo.bar/v0/biz?qux=qix');
    });
  });
});
