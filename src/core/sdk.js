import * as actions from './actions';
import { AuthorizationRequiredError, UnauthorizedError } from './errors';
import { OAuthClient, Paginator } from './services';
import { buildBearerAuthorizationHeader, buildUrl } from './utils';
import get from 'lodash/get';

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
      otpTokenStatus: 'uphold.otp_token_status',
      refreshTokenKey: 'uphold.refresh_token',
      scope: 'uphold.scope',
      version: 'v0'
    };

    this.options = { ...defaultOptions, ...options };
    this.refreshRequestPromise = null;
    this.tokenRequestPromise = null;

    // Instantiate oauth client.
    this.oauthClient = new OAuthClient(this.options);
  }

  api(uri, options = {}) {
    const { authenticate = true, headers = {}, method = 'get', queryParams, raw, version = this.options.version } = options;
    let { body } = options;

    const url = buildUrl(uri, this.options.baseUrl, version, queryParams);

    let request;

    if (body) {
      if (typeof body === 'object') {
        body = JSON.stringify(body);
      }
      headers['content-type'] = 'application/json';
    }

    if (authenticate && !headers.authorization) {
      request = this.getToken().then(tokens => {
        return this.client.request(url, method, body, {
          ...buildBearerAuthorizationHeader(tokens.access_token),
          ...headers
        }, options);
      });
    } else {
      request = this.client.request(url, method, body, headers, options);
    }

    return request
      .then(data => { return raw ? data : data.body; })
      .catch(this._refreshToken(url, method, body, headers, options));
  }

  authorize(code) {
    const accessTokenRequest = this.oauthClient.buildAccessTokenRequestByAuthorizationCodeGrant(code);

    this.tokenRequestPromise = this._authenticationRequest(accessTokenRequest);

    return this.tokenRequestPromise;
  }

  exchangeToken(target) {
    const body = `client_id=${target.client_id}&client_secret=${target.client_secret}&grant_type=urn:ietf:params:oauth:grant-type:single-sign-on`;
    const headers = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    const method = 'post';
    const url = buildUrl('/oauth2/token', this.options.baseUrl, '');

    const request = this.getToken().then(tokens => {
      return this.client.request(url, method, body, { ...headers, ...buildBearerAuthorizationHeader(tokens.access_token) });
    });

    return request
      .then(data => { return data.body; })
      .catch(this._refreshToken(url, 'post', body, headers));
  }

  getToken() {
    console.log('this.storage', this.storage);
    console.log('this.options', this.options);

    return this.storage.getItem(this.options.accessTokenKey)
      .then(access_token => {
        console.log('access_token', access_token);

        if (!access_token) {
          this.tokenRequestPromise = null;

          return Promise.reject();
        }

        return this.storage.getItem(this.options.refreshTokenKey)
          .then(refresh_token => ({
            access_token,
            refresh_token
          }))
          // Do not reject if refresh token does not exist.
          .catch(() => ({ access_token }));
      })
      .catch((error) => {
        console.log('ERROR', error);

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

  setToken(token, headers = {}) {
    return this.storage.setItem(this.options.accessTokenKey, token.access_token)
      .then(() => {
        this.storage.setItem(this.options.scope, get(token, 'scope', ''));
        this.storage.setItem(this.options.otpTokenStatus, get(headers, 'otp-token', ''));

        if (token.refresh_token) {
          this.storage.setItem(this.options.refreshTokenKey, token.refresh_token);
        }
      })
      .then(() => token);
  }

  _authenticationRequest({ body, headers, url }) {
    return this.client.request(url, 'post', body, headers)
      .then(({ body, headers }) => this.setToken(body, headers));
  }

  _refreshToken(url, method, body, headers, options) { // eslint-disable-line max-params
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
          }, options)
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

// eslint-disable-next-line no-unused-vars
for (const action in actions) {
  SDK.prototype[action] = actions[action];
}
