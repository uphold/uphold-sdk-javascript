'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _errors = require('./errors');

var _services = require('./services');

var _utils = require('./utils');

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

    this.options = _extends({}, defaultOptions, options);
    this.refreshRequestPromise = null;
    this.tokenRequestPromise = null;

    // Instantiate oauth client.
    this.oauthClient = new _services.OAuthClient(this.options);
  }

  api(uri) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$authenticate = options.authenticate;
    const authenticate = _options$authenticate === undefined ? true : _options$authenticate;
    var _options$headers = options.headers;
    const headers = _options$headers === undefined ? {} : _options$headers;
    var _options$method = options.method;
    const method = _options$method === undefined ? 'get' : _options$method,
          queryParams = options.queryParams,
          raw = options.raw;
    var _options$version = options.version;
    const version = _options$version === undefined ? this.options.version : _options$version;
    let body = options.body;


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
        return this.client.request(url, method, body, _extends({}, (0, _utils.buildBearerAuthorizationHeader)(tokens.access_token), headers), options);
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
        access_token: access_token,
        refresh_token: refresh_token
      }))
      // Do not reject if refresh token does not exist.
      .catch(() => ({ access_token: access_token }));
    }).catch(() => {
      // If there is a token request in progress, we wait for it.
      if (this.tokenRequestPromise) {
        return this.tokenRequestPromise;
      }

      // There was never a token request.
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

  paginate(url) {
    let page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    let itemsPerPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.itemsPerPage;
    let options = arguments[3];

    return new _services.Paginator(this, url, itemsPerPage, options).getPage(page);
  }

  removeToken() {
    return Promise.all([this.storage.removeItem(this.options.accessTokenKey), this.storage.removeItem(this.options.refreshTokenKey)]);
  }

  setToken(token) {
    let headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.storage.setItem(this.options.accessTokenKey, token.access_token).then(() => {
      this.storage.setItem(this.options.scope, (0, _lodash.get)(token, 'scope', ''));
      this.storage.setItem(this.options.otpTokenStatus, (0, _lodash.get)(headers, 'otp-token', ''));

      if (token.refresh_token) {
        this.storage.setItem(this.options.refreshTokenKey, token.refresh_token);
      }
    }).then(() => token);
  }

  _authenticationRequest(_ref) {
    let body = _ref.body,
        headers = _ref.headers,
        url = _ref.url;

    return this.client.request(url, 'post', body, headers).then((_ref2) => {
      let body = _ref2.body,
          headers = _ref2.headers;
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
        return this.client.request(url, method, body, _extends({}, (0, _utils.buildBearerAuthorizationHeader)(tokens.access_token), headers), options).then(data => data.body);
      });
    };
  }

  _requestRefreshToken(response) {
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
      var _oauthClient$buildRev = this.oauthClient.buildRevokeTokenRequest(tokens.access_token);

      const body = _oauthClient$buildRev.body,
            headers = _oauthClient$buildRev.headers,
            url = _oauthClient$buildRev.url;


      return this.client.request(url, 'post', body, headers);
    });
  }
}

exports.default = SDK;
for (const action in actions) {
  SDK.prototype[action] = actions[action];
}