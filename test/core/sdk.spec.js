import SDK, { AuthorizationRequiredError, Paginator, UnauthorizedError } from '../../src/core';

describe('SDK', () => {
  describe('constuctor()', () => {
    it('should validate the options', () => {
      expect(() => new SDK()).toThrow('Missing options');
    });

    it('should validate the clientId', () => {
      expect(() => new SDK({})).toThrow(`Missing 'clientId' option`);
    });

    it('should validate the clientSecret', () => {
      expect(() => new SDK({ clientId: 'foo' })).toThrow(`Missing 'clientSecret' option`);
    });

    it('should default the `accessTokenKey` option', () => {
      expect(new SDK({ clientId: 'foo', clientSecret: 'bar' }).options.accessTokenKey).toBe('uphold.access_token');
    });

    it('should override the `accessTokenKey` option', () => {
      expect(new SDK({ accessTokenKey: 'foo', clientId: 'bar', clientSecret: 'biz' }).options.accessTokenKey).toBe('foo');
    });

    it('should default the `baseUrl` option', () => {
      expect(new SDK({ clientId: 'foo', clientSecret: 'bar' }).options.baseUrl).toBe('https://api.uphold.com');
    });

    it('should override the `baseUrl` option', () => {
      expect(new SDK({ baseUrl: 'foo', clientId: 'bar', clientSecret: 'biz' }).options.baseUrl).toBe('foo');
    });

    it('should default the `itemsPerPage` option', () => {
      expect(new SDK({ clientId: 'foo', clientSecret: 'bar' }).options.itemsPerPage).toBe(10);
    });

    it('should override the `itemsPerPage` option', () => {
      expect(new SDK({ clientId: 'bar', clientSecret: 'biz', itemsPerPage: 20 }).options.itemsPerPage).toBe(20);
    });

    it('should default the `refreshTokenKey` option', () => {
      expect(new SDK({ clientId: 'foo', clientSecret: 'bar' }).options.refreshTokenKey).toBe('uphold.refresh_token');
    });

    it('should override the `refreshTokenKey` option', () => {
      expect(new SDK({ clientId: 'bar', clientSecret: 'biz', refreshTokenKey: 'bar' }).options.refreshTokenKey).toBe('bar');
    });

    it('should default the `version` option', () => {
      expect(new SDK({ clientId: 'foo', clientSecret: 'bar' }).options.version).toBe('v0');
    });

    it('should override the `version` option', () => {
      expect(new SDK({ clientId: 'bar', clientSecret: 'biz', version: 'v1' }).options.version).toBe('v1');
    });
  });

  describe('getToken()', () => {
    const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

    sdk.storage = { getItem: jest.fn() };

    it('should use stored tokens', () => {
      sdk.storage.getItem.mockImplementation(key => {
        if (key === 'uphold.access_token') {
          return Promise.resolve('foo');
        }

        if (key === 'uphold.refresh_token') {
          return Promise.resolve('bar');
        }
      });

      return sdk.getToken()
        .then(tokens => {
          expect(tokens).toEqual({
            access_token: 'foo',
            refresh_token: 'bar'
          });
        });
    });

    it('should only use stored access token', () => {
      sdk.storage.getItem.mockImplementation(key => {
        if (key === 'uphold.access_token') {
          return Promise.resolve('foo');
        }

        if (key === 'uphold.refresh_token') {
          return Promise.reject();
        }
      });

      return sdk.getToken()
        .then(tokens => {
          expect(tokens).toEqual({ access_token: 'foo' });
        });
    });

    it('should throw an error if access token is empty', done => {
      sdk.storage.getItem.mockImplementation(key => {
        if (key === 'uphold.access_token') {
          return Promise.resolve('');
        }
      });

      return sdk.getToken()
        .catch(e => {
          expect(e).toBeInstanceOf(AuthorizationRequiredError);
          done();
        });
    });

    it('should throw an error if access token is null', done => {
      sdk.storage.getItem.mockReturnValue(Promise.reject());

      return sdk.getToken()
        .catch(e => {
          expect(e).toBeInstanceOf(AuthorizationRequiredError);
          done();
        });
    });

    it('should use an in-progress token request', () => {
      sdk.storage.getItem.mockReturnValue(Promise.reject());
      sdk.tokenRequestPromise = 'foo';

      return sdk.getToken()
        .then(tokenRequestPromise => {
          expect(tokenRequestPromise).toBe('foo');
        });
    });
  });

  describe('logout()', () => {
    const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

    beforeEach(() => {
      sdk.client = { request: jest.fn(() => Promise.resolve()) };
      sdk.storage = {
        getItem: jest.fn(key => {
          if (key === 'uphold.access_token') {
            return Promise.resolve('foo');
          }

          if (key === 'uphold.refresh_token') {
            return Promise.reject();
          }
        }),
        removeItem: jest.fn(),
        setItem: jest.fn()
      };
    });

    it('should revoke session access token', () => {
      return sdk.logout()
        .then(() => {
          expect(sdk.client.request).toBeCalledWith('https://api.uphold.com/oauth2/revoke', 'post', 'token=foo', {
            authorization: 'Bearer foo',
            'content-type': 'application/x-www-form-urlencoded'
          });
        });
    });

    it('should remove the session tokens if revoked successfuly', () => {
      return sdk.logout()
        .then(() => {
          expect(sdk.storage.removeItem.mock.calls).toEqual([
            ['uphold.access_token'],
            ['uphold.refresh_token']
          ]);
        });
    });

    it('should remove the session tokens if stored token is invalid', () => {
      sdk.client.request.mockReturnValue(Promise.reject(new UnauthorizedError()));

      return sdk.logout()
        .then(() => {
          expect(sdk.storage.removeItem.mock.calls).toEqual([
            ['uphold.access_token'],
            ['uphold.refresh_token']
          ]);
        });
    });

    it('should reject an unhandled error', done => {
      sdk.client.request.mockReturnValue(Promise.reject('foo'));

      return sdk.logout()
        .catch(e => {
          expect(e).toBe('foo');
          done();
        });
    });
  });

  describe('paginate()', () => {
    const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

    beforeEach(() => {
      sdk.api = jest.fn();
    });

    it('should return a first page paginator with the default items per page', () => {
      sdk.api.mockReturnValue(Promise.resolve({
        body: 'body',
        headers: {
          'content-range': 'items 0-9/10'
        }
      }));

      return sdk.paginate('foo')
        .then(paginator => {
          expect(paginator).toBeInstanceOf(Paginator);
          expect(paginator.currentPage).toBe(1);
          expect(sdk.api).toBeCalledWith('foo', {
            headers: {
              range: 'items=0-9'
            },
            raw: true
          });
        });
    });

    it('should return a paginator with given page and items per page', () => {
      sdk.api.mockReturnValue(Promise.resolve({
        body: 'body',
        headers: {
          'content-range': 'items 3-5/10'
        }
      }));

      return sdk.paginate('foo', 2, 3)
        .then(paginator => {
          expect(paginator).toBeInstanceOf(Paginator);
          expect(paginator.currentPage).toBe(2);
          expect(sdk.api).toBeCalledWith('foo', {
            headers: {
              range: 'items=3-5'
            },
            raw: true
          });
        });
    });
  });

  describe('setToken()', () => {
    const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

    beforeEach(() => {
      sdk.storage = { setItem: jest.fn(() => Promise.resolve()) };
    });

    it('should store both access and refresh tokens', () => {
      return sdk.setToken({ access_token: 'foo', refresh_token: 'bar' })
        .then(() => {
          expect(sdk.storage.setItem.mock.calls).toEqual([
            ['uphold.access_token', 'foo'],
            ['uphold.refresh_token', 'bar']
          ]);
        });
    });

    it('should not set refresh_token if not provided', () => {
      return sdk.setToken({ access_token: 'foo' })
        .then(() => {
          expect(sdk.storage.setItem).toBeCalledWith('uphold.access_token', 'foo');
        });
    });
  });

  describe('authorize()', () => {
    const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

    beforeEach(() => {
      sdk.client = {
        request: jest.fn(() => Promise.resolve({ body: { access_token: 'foo' } }))
      };

      sdk.storage = {
        getItem: jest.fn(() => Promise.resolve()),
        setItem: jest.fn(() => Promise.resolve())
      };
    });

    it('should authenticate the user with given `code` and `authorization_code` as `grant_type`', () => {
      return sdk.authorize('code')
        .then(() => {
          expect(sdk.client.request.mock.calls.length).toBe(1);
          expect(sdk.client.request.mock.calls[0][1]).toBe('post');
          expect(sdk.client.request.mock.calls[0][2]).toBe('client_id=foo&client_secret=bar&code=code&grant_type=authorization_code');
          expect(sdk.client.request.mock.calls[0][3]).toEqual({ 'content-type': 'application/x-www-form-urlencoded' });
        });
    });

    it('should return the request body', () => {
      return sdk.authorize('code')
        .then(result => {
          expect(result).toEqual({ access_token: 'foo' });
        });
    });

    it('should store the access token', () => {
      return sdk.authorize('code')
        .then(() => {
          expect(sdk.storage.setItem).toBeCalledWith('uphold.access_token', 'foo');
        });
    });

    it('should queue authorized requests', () => {
      sdk.storage = {
        getItem: jest.fn(() => Promise.resolve('token'))
      };

      return Promise.all([
        sdk.api('/foo'),
        sdk.api('/bar'),
        sdk.api('/biz', { authenticate: false })
      ])
        .then(() => {
          expect(sdk.client.request.mock.calls.length).toBe(3);
          expect(sdk.client.request.mock.calls[0][0]).toBe('https://api.uphold.com/v0/biz');
          expect(sdk.client.request.mock.calls[1][0]).toBe('https://api.uphold.com/v0/foo');
          expect(sdk.client.request.mock.calls[2][0]).toBe('https://api.uphold.com/v0/bar');
        });
    });
  });

  describe('api()', () => {
    const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

    beforeEach(() => {
      sdk.client = { request: jest.fn(() => Promise.resolve({})) };
      sdk.storage = {
        getItem: jest.fn(() => Promise.resolve('token')),
        setItem: jest.fn(() => Promise.resolve('token'))
      };
    });

    describe('when an access token expires', () => {
      it('should refresh the token', () => {
        sdk.client.request.mockReturnValueOnce(Promise.reject({ body: { error: 'invalid_token' }, headers: {} }));
        sdk.client.request.mockReturnValueOnce(Promise.resolve({ body: { access_token: 'foo', refresh_token: 'bar' } }));
        sdk.client.request.mockReturnValueOnce(Promise.resolve({ body: {} }));

        return sdk.api('/biz')
          .then(() => {
            expect(sdk.client.request.mock.calls.length).toBe(3);
            expect(sdk.client.request.mock.calls[0][0]).toBe('https://api.uphold.com/v0/biz');
            expect(sdk.client.request.mock.calls[1][0]).toBe('https://api.uphold.com/oauth2/token');
            expect(sdk.client.request.mock.calls[2][0]).toBe('https://api.uphold.com/v0/biz');
            expect(sdk.client.request.mock.calls[2][3]).toEqual({ authorization: 'Bearer foo' });
          });
      });

      it('should not refresh the token if refresh token is not stored', done => {
        sdk.client.request.mockReturnValue(Promise.reject({ body: { error: 'invalid_token' } }));
        sdk.storage.getItem.mockImplementation(key => {
          if (key === 'uphold.access_token') {
            return Promise.resolve('foo');
          }

          if (key === 'uphold.refresh_token') {
            return Promise.reject();
          }
        });

        return sdk.api('/foo')
          .catch(result => {
            expect(sdk.client.request.mock.calls.length).toBe(1);
            expect(sdk.client.request.mock.calls[0][0]).toBe('https://api.uphold.com/v0/foo');
            expect(result).toEqual({ body: { error: 'invalid_token' } });
            done();
          });
      });

      it('should use an existent refresh token request', () => {
        sdk.client.request.mockReturnValueOnce(Promise.reject({ body: { error: 'invalid_token' } }));
        sdk.client.request.mockReturnValueOnce(Promise.resolve({ body: { foo: 'bar' } }));
        sdk.refreshRequestPromise = Promise.resolve({});

        return sdk.api('/foo')
          .then(result => {
            expect(result).toEqual({ foo: 'bar' });
          });
      });
    });

    describe('without the `authenticate` option', () => {
      it('should send a request with an `Authorization` header', () => {
        return sdk.api('/foo')
          .then(() => {
            expect(sdk.client.request).toBeCalledWith(
              'https://api.uphold.com/v0/foo',
              'get',
              undefined,
              { authorization: 'Bearer token' },
              {}
            );
          });
      });

      it('should not build the `authorization` header if value is already provided', () => {
        return sdk.api('/foo', { headers: { authorization: 'foo' } })
          .then(() => {
            expect(sdk.storage.getItem).not.toBeCalled();
            expect(sdk.client.request).toBeCalledWith(
              'https://api.uphold.com/v0/foo',
              'get',
              undefined,
              { authorization: 'foo' },
              { headers: { authorization: 'foo' } }
            );
          });
      });

      it('should return an authentication error if no access token is stored', done => {
        sdk.storage.getItem.mockReturnValue(Promise.reject());

        return sdk.api('/foo')
          .catch(e => {
            expect(e).toBeInstanceOf(AuthorizationRequiredError);
            expect(sdk.client.request.mock.calls.length).toBe(0);
            done();
          });
      });
    });

    describe('with the `authenticate` option as `false`', () => {
      it('should not send the `Authorization` header', () => {
        sdk.storage.getItem.mockReturnValue(null);

        return sdk.api('/foo', { authenticate: false })
          .then(() => {
            expect(sdk.client.request).toBeCalledWith(
              'https://api.uphold.com/v0/foo',
              'get',
              undefined,
              {},
              { authenticate: false }
            );
          });
      });
    });

    it('should build the body', () => {
      const newCard = { currency: 'foo', label: 'bar' };

      return sdk.api('/biz', { body: newCard, method: 'post' })
        .then(() => {
          expect(sdk.client.request.mock.calls.length).toBe(1);
          expect(sdk.client.request.mock.calls[0][2]).toBe(JSON.stringify(newCard));
        });
    });

    it('should pass a stringified body without modification', () => {
      const newCard = JSON.stringify({ currency: 'foo', label: 'bar' });

      return sdk.api('/biz', { body: newCard, method: 'post' })
        .then(() => {
          expect(sdk.client.request.mock.calls.length).toBe(1);
          expect(sdk.client.request.mock.calls[0][2]).toBe(newCard);
        });
    });

    it('should return the full response if `raw` option is provided', () => {
      sdk.client.request.mockReturnValue(Promise.resolve('foo'));

      return sdk.api('/bar', { raw: true })
        .then(result => {
          expect(result).toBe('foo');
        });
    });

    it('should add custom headers', () => {
      sdk.client.request.mockReturnValue(Promise.resolve('foo'));
      const options = { authenticate: false, headers: { foo: 'bar' } };

      return sdk.api('/biz', options)
        .then(() => {
          expect(sdk.client.request).toBeCalledWith('https://api.uphold.com/v0/biz', 'get', undefined, { foo: 'bar' }, options);
        });
    });

    it('should build the request url with configured version if `version` is not provided', () => {
      const options = { authenticate: false };

      return sdk.api('/foo', options)
        .then(() => {
          expect(sdk.client.request).toBeCalledWith('https://api.uphold.com/v0/foo', 'get', undefined, {}, options);
        });
    });

    it('should build the request url with given `version`', () => {
      const options = { authenticate: false, version: 'bar' };

      return sdk.api('/foo', options)
        .then(() => {
          expect(sdk.client.request).toBeCalledWith('https://api.uphold.com/bar/foo', 'get', undefined, {}, options);
        });
    });

    it('should build the request url with no version if `version` is given as `false`', () => {
      const options = { authenticate: false, version: false };

      return sdk.api('/foo', options)
        .then(() => {
          expect(sdk.client.request).toBeCalledWith('https://api.uphold.com/foo', 'get', undefined, {}, options);
        });
    });
  });
});
