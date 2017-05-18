'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../utils');

class OAuthClient {
  constructor(_ref) {
    let baseUrl = _ref.baseUrl,
        clientId = _ref.clientId,
        clientSecret = _ref.clientSecret;

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.headers = { 'content-type': 'application/x-www-form-urlencoded' };
    this.requestUrl = (0, _utils.buildUrl)('/oauth2/token', baseUrl);
    this.revokeUrl = (0, _utils.buildUrl)('/oauth2/revoke', baseUrl);
  }

  buildAccessTokenRequestByAuthorizationCodeGrant(code) {
    return {
      body: this._generateRequestBody({
        code: code,
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
      body: (0, _utils.buildBody)({ token: token }),
      headers: _extends({}, (0, _utils.buildBearerAuthorizationHeader)(token), this.headers),
      url: this.revokeUrl
    };
  }

  _generateRequestBody(data) {
    return (0, _utils.buildBody)(_extends({
      client_id: this.clientId,
      client_secret: this.clientSecret
    }, data));
  }
}
exports.default = OAuthClient;