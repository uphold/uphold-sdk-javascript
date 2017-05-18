import { OAuthClient } from '../../../src/core';

describe('OAuthClient', () => {
  const client = new OAuthClient({ baseUrl: 'http://foo.bar', clientId: 'foo', clientSecret: 'bar' });

  describe('constructor()', () => {
    it('should set given `clientId`', () => {
      expect(client.clientId).toBe('foo');
    });

    it('should set given `clientSecret`', () => {
      expect(client.clientSecret).toBe('bar');
    });

    it('should set `headers`', () => {
      expect(client.headers).toEqual({ 'content-type': 'application/x-www-form-urlencoded' });
    });

    it('should set `requestUrl`', () => {
      expect(client.requestUrl).toBe('http://foo.bar/oauth2/token');
    });

    it('should set `revokeUrl`', () => {
      expect(client.revokeUrl).toBe('http://foo.bar/oauth2/revoke');
    });
  });

  describe('buildAccessTokenRequestByAuthorizationCodeGrant()', () => {
    it('should return an access token request with authorization code grant type', () => {
      expect(client.buildAccessTokenRequestByAuthorizationCodeGrant('code')).toEqual({
        body: 'client_id=foo&client_secret=bar&code=code&grant_type=authorization_code',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'http://foo.bar/oauth2/token'
      });
    });
  });

  describe('buildRevokeTokenRequest()', () => {
    it('should return a revoke token request', () => {
      expect(client.buildRevokeTokenRequest('token')).toEqual({
        body: 'token=token',
        headers: {
          authorization: 'Bearer token',
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'http://foo.bar/oauth2/revoke'
      });
    });
  });
});
