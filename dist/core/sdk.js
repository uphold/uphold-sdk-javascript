"use strict";

exports.__esModule = true;
exports.default = void 0;

var actions = _interopRequireWildcard(require("./actions"));

var _errors = require("./errors");

var _services = require("./services");

var _utils = require("./utils");

var _get = _interopRequireDefault(require("lodash/get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class SDK {
  constructor(options) {
    if (!options) {
      throw new Error(`Missing options`);
    }

    if (!options.clientId) {
      throw new Error(`Missing 'clientId' option`);
    }

    if (!options.clientSecret) {
      throw new Error(`Missing 'clientSecret' option`);
    }

    const defaultOptions = {
      accessTokenKey: 'uphold.access_token',
      baseUrl: 'https://api.uphold.com',
      itemsPerPage: 10,
      otpTokenStatus: 'uphold.otp_token_status',
      refreshTokenKey: 'uphold.refresh_token',
      scope: 'uphold.scope',
      version: 'v0'
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.refreshRequestPromise = null;
    this.tokenRequestPromise = null; // Instantiate oauth client.

    this.oauthClient = new _services.OAuthClient(this.options);
  }

  api(uri, options = {}) {
    const {
      authenticate = true,
      headers = {},
      method = 'get',
      queryParams,
      raw,
      version = this.options.version
    } = options;
    let {
      body
    } = options;
    const url = (0, _utils.buildUrl)(uri, this.options.baseUrl, version, queryParams);
    let request;

    if (body) {
      if (typeof body === 'object') {
        body = JSON.stringify(body);
      }

      headers['content-type'] = 'application/json';
    }

    if (authenticate && !headers.authorization) {
      request = this.getToken().then(tokens => {
        return this.client.request(url, method, body, Object.assign({}, (0, _utils.buildBearerAuthorizationHeader)(tokens.access_token), headers), options);
      });
    } else {
      request = this.client.request(url, method, body, headers, options);
    }

    return request.then(data => {
      return raw ? data : data.body;
    }).catch(this._refreshToken(url, method, body, headers, options));
  }

  authorize(code) {
    const accessTokenRequest = this.oauthClient.buildAccessTokenRequestByAuthorizationCodeGrant(code);
    this.tokenRequestPromise = this._authenticationRequest(accessTokenRequest);
    return this.tokenRequestPromise;
  }

  getToken() {
    return this.storage.getItem(this.options.accessTokenKey).then(access_token => {
      if (!access_token) {
        this.tokenRequestPromise = null;
        return Promise.reject();
      }

      return this.storage.getItem(this.options.refreshTokenKey).then(refresh_token => ({
        access_token,
        refresh_token
      })) // Do not reject if refresh token does not exist.
      .catch(() => ({
        access_token
      }));
    }).catch(() => {
      // If there is a token request in progress, we wait for it.
      if (this.tokenRequestPromise) {
        return this.tokenRequestPromise;
      } // There was never a token request.


      return Promise.reject(new _errors.AuthorizationRequiredError());
    });
  }

  logout() {
    return this._revokeToken().catch(e => {
      // Do not reject an attempt to revoke an invalid token.
      if (!(e instanceof _errors.UnauthorizedError)) {
        return Promise.reject(e);
      }
    }).then(() => this.removeToken());
  }

  paginate(url, page = 1, itemsPerPage = this.options.itemsPerPage, options) {
    return new _services.Paginator(this, url, itemsPerPage, options).getPage(page);
  }

  removeToken() {
    return Promise.all([this.storage.removeItem(this.options.accessTokenKey), this.storage.removeItem(this.options.refreshTokenKey)]);
  }

  setToken(token, headers = {}) {
    console.log('setToken', this.storage);
    return this.storage.setItem(this.options.accessTokenKey, token.access_token).then(() => {
      this.storage.setItem(this.options.scope, (0, _get.default)(token, 'scope', ''));
      this.storage.setItem(this.options.otpTokenStatus, (0, _get.default)(headers, 'otp-token', ''));

      if (token.refresh_token) {
        this.storage.setItem(this.options.refreshTokenKey, token.refresh_token);
      }
    }).then(() => {
      console.log('setToken set', this.storage);
      return token;
    });
  }

  _authenticationRequest({
    body,
    headers,
    url
  }) {
    return this.client.request(url, 'post', body, headers).then(({
      body,
      headers
    }) => {
      return this.setToken(body, headers);
    });
  }

  _refreshToken(url, method, body, headers, options) {
    // eslint-disable-line max-params
    return response => {
      if (!response || !response.body || response.body.error !== 'invalid_token') {
        return Promise.reject(response);
      }

      if (!this.refreshRequestPromise) {
        this.refreshRequestPromise = this._requestRefreshToken(response);
      }

      return this.refreshRequestPromise.then(tokens => {
        return this.client.request(url, method, body, Object.assign({}, (0, _utils.buildBearerAuthorizationHeader)(tokens.access_token), headers), options).then(data => data.body);
      });
    };
  }

  _requestRefreshToken(response) {
    console.log('storage value', this.storage);
    return this.storage.getItem(this.options.refreshTokenKey).catch(() => Promise.reject(response)).then(refreshToken => {
      const refreshTokenRequest = this.oauthClient.buildRefreshTokenRequest(refreshToken);
      return this._authenticationRequest(refreshTokenRequest).then(tokens => {
        this.refreshRequestPromise = null;
        return tokens;
      });
    });
  }

  _revokeToken() {
    return this.getToken().then(tokens => {
      const {
        body,
        headers,
        url
      } = this.oauthClient.buildRevokeTokenRequest(tokens.access_token);
      return this.client.request(url, 'post', body, headers);
    });
  }

} // eslint-disable-next-line no-unused-vars


exports.default = SDK;

for (const action in actions) {
  SDK.prototype[action] = actions[action];
}