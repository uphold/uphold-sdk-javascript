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
      refreshTokenKey: 'uphold.refresh_token',
      version: 'v0'
    };

    this.options = _extends({}, defaultOptions, options);
    this.refreshRequestPromise = null;
    this.tokenRequestPromise = null;

    // Instantiate oauth client.
    this.oauthClient = new _services.OAuthClient(this.options);
  }

  api(uri) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$authenticate = _ref.authenticate;

    let authenticate = _ref$authenticate === undefined ? true : _ref$authenticate,
        body = _ref.body;
    var _ref$headers = _ref.headers;
    let headers = _ref$headers === undefined ? {} : _ref$headers;
    var _ref$method = _ref.method;
    let method = _ref$method === undefined ? 'get' : _ref$method,
        queryParams = _ref.queryParams,
        raw = _ref.raw;
    var _ref$version = _ref.version;
    let version = _ref$version === undefined ? this.options.version : _ref$version;

    const url = (0, _utils.buildUrl)(uri, this.options.baseUrl, version, queryParams);

    let request;

    if (body) {
      body = JSON.stringify(body);
      headers['content-type'] = 'application/json';
    }

    if (authenticate && !headers.authorization) {
      request = this.getToken().then(tokens => {
        return this.client.request(url, method, body, _extends({}, (0, _utils.buildBearerAuthorizationHeader)(tokens.access_token), headers));
      });
    } else {
      request = this.client.request(url, method, body, headers);
    }

    return request.then(data => {
      return raw ? data : data.body;
    }).catch(this._refreshToken(url, method, body, headers));
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
    return this.storage.setItem(this.options.accessTokenKey, token.access_token).then(() => {
      if (token.refresh_token) {
        return this.storage.setItem(this.options.refreshTokenKey, token.refresh_token);
      }
    }).then(() => token);
  }

  _authenticationRequest(_ref2) {
    let body = _ref2.body,
        headers = _ref2.headers,
        url = _ref2.url;

    return this.client.request(url, 'post', body, headers).then((_ref3) => {
      let body = _ref3.body;
      return this.setToken(body);
    });
  }

  _refreshToken(url, method, body, headers) {
    return response => {
      if (!response || !response.body || response.body.error !== 'invalid_token') {
        return Promise.reject(response);
      }

      if (!this.refreshRequestPromise) {
        this.refreshRequestPromise = this._requestRefreshToken(response);
      }

      return this.refreshRequestPromise.then(tokens => {
        return this.client.request(url, method, body, _extends({}, (0, _utils.buildBearerAuthorizationHeader)(tokens.access_token), headers)).then(data => data.body);
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