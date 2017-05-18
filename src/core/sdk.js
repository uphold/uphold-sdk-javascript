import * as actions from './actions';
import { AuthorizationRequiredError, UnauthorizedError } from './errors';
import { OAuthClient, Paginator } from './services';
import { buildBearerAuthorizationHeader, buildUrl } from './utils';

export default class SDK {
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

    this.options = { ...defaultOptions, ...options };
    this.refreshRequestPromise = null;
    this.tokenRequestPromise = null;

    // Instantiate oauth client.
    this.oauthClient = new OAuthClient(this.options);
  }

  api(uri, { authenticate = true, body, headers = {}, method = 'get', queryParams, raw, version = this.options.version } = {}) {
    const url = buildUrl(uri, this.options.baseUrl, version, queryParams);

    let request;

    if (body) {
      body = JSON.stringify(body);
      headers['content-type'] = 'application/json';
    }

    if (authenticate && !headers.authorization) {
      request = this.getToken().then(tokens => {
        return this.client.request(url, method, body, {
          ...buildBearerAuthorizationHeader(tokens.access_token),
          ...headers
        });
      });
    } else {
      request = this.client.request(url, method, body, headers);
    }

    return request
      .then(data => { return raw ? data : data.body; })
      .catch(this._refreshToken(url, method, body, headers));
  }

  authorize(code) {
    const accessTokenRequest = this.oauthClient.buildAccessTokenRequestByAuthorizationCodeGrant(code);

    this.tokenRequestPromise = this._authenticationRequest(accessTokenRequest);

    return this.tokenRequestPromise;
  }

  getToken() {
    return this.storage.getItem(this.options.accessTokenKey)
      .then(access_token => {
        return this.storage.getItem(this.options.refreshTokenKey)
          .then(refresh_token => ({
            access_token,
            refresh_token
          }))
          // Do not reject if refresh token does not exist.
          .catch(() => ({ access_token }));
      })
      .catch(() => {
        // If there is a token request in progress, we wait for it.
        if (this.tokenRequestPromise) {
          return this.tokenRequestPromise;
        }

        // There was never a token request.
        return Promise.reject(new AuthorizationRequiredError());
      });
  }

  logout() {
    return this._revokeToken()
      .catch(e => {
        // Do not reject an attempt to revoke an invalid token.
        if (!(e instanceof UnauthorizedError)) {
          return Promise.reject(e);
        }
      })
      .then(() => this.removeToken());
  }

  paginate(url, page = 1, itemsPerPage = this.options.itemsPerPage, options) {
    return new Paginator(this, url, itemsPerPage, options).getPage(page);
  }

  removeToken() {
    return Promise.all([
      this.storage.removeItem(this.options.accessTokenKey),
      this.storage.removeItem(this.options.refreshTokenKey)
    ]);
  }

  setToken(token) {
    return this.storage.setItem(this.options.accessTokenKey, token.access_token)
      .then(() => {
        if (token.refresh_token) {
          return this.storage.setItem(this.options.refreshTokenKey, token.refresh_token);
        }
      })
      .then(() => token);
  }

  _authenticationRequest({ body, headers, url }) {
    return this.client.request(url, 'post', body, headers)
      .then(({ body }) => this.setToken(body));
  }

  _refreshToken(url, method, body, headers) {
    return response => {
      if (!response || !response.body || response.body.error !== 'invalid_token') {
        return Promise.reject(response);
      }

      if (!this.refreshRequestPromise) {
        this.refreshRequestPromise = this._requestRefreshToken(response);
      }

      return this.refreshRequestPromise
        .then(tokens => {
          return this.client.request(url, method, body, {
            ...buildBearerAuthorizationHeader(tokens.access_token),
            ...headers
          })
            .then(data => data.body);
        });
    };
  }

  _requestRefreshToken(response) {
    return this.storage.getItem(this.options.refreshTokenKey)
      .catch(() => Promise.reject(response))
      .then(refreshToken => {
        const refreshTokenRequest = this.oauthClient.buildRefreshTokenRequest(refreshToken);

        return this._authenticationRequest(refreshTokenRequest)
          .then(tokens => {
            this.refreshRequestPromise = null;

            return tokens;
          });
      });
  }

  _revokeToken() {
    return this.getToken()
      .then(tokens => {
        const { body, headers, url } = this.oauthClient.buildRevokeTokenRequest(tokens.access_token);

        return this.client.request(url, 'post', body, headers);
      });
  }
}

for (const action in actions) {
  SDK.prototype[action] = actions[action];
}
