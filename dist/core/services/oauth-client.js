"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

class OAuthClient {
  constructor({
    baseUrl,
    clientId,
    clientSecret
  }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.headers = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    this.requestUrl = (0, _utils.buildUrl)('/oauth2/token', baseUrl);
    this.revokeUrl = (0, _utils.buildUrl)('/oauth2/revoke', baseUrl);
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
      body: (0, _utils.buildBody)({
        token
      }),
      headers: Object.assign(Object.assign({}, (0, _utils.buildBearerAuthorizationHeader)(token)), this.headers),
      url: this.revokeUrl
    };
  }

  _generateRequestBody(data) {
    return (0, _utils.buildBody)(Object.assign({
      client_id: this.clientId,
      client_secret: this.clientSecret
    }, data));
  }

}

exports.default = OAuthClient;