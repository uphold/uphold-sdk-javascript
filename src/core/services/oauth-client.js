import { buildBearerAuthorizationHeader, buildBody, buildUrl } from '../utils';

export default class OAuthClient {
  constructor({ baseUrl, clientId, clientSecret }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.headers = { 'content-type': 'application/x-www-form-urlencoded' };
    this.requestUrl = buildUrl('/oauth2/token', baseUrl);
    this.revokeUrl = buildUrl('/oauth2/revoke', baseUrl);
  }

  buildAccessTokenRequestByAuthorizationCodeGrant(code) {
    return {
      body: this._generateRequestBody({
        code,
        grant_type: 'authorization_code'
      }),
      headers: this.headers,
      url: this.requestUrl
    };
  }

  buildRefreshTokenRequest(token) {
    return {
      body: this._generateRequestBody({
        grant_type: 'refresh_token',
        refresh_token: token
      }),
      headers: this.headers,
      url: this.requestUrl
    };
  }

  buildRevokeTokenRequest(token) {
    return {
      body: buildBody({ token }),
      headers: {
        ...buildBearerAuthorizationHeader(token),
        ...this.headers
      },
      url: this.revokeUrl
    };
  }

  _generateRequestBody(data) {
    return buildBody({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      ...data
    });
  }
}
