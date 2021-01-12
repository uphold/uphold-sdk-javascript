import SDK from '../../../src/core';

describe('UserActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('getMe()', () => {
    it('should make a request to `GET /me`', () => {
      return sdk.getMe({ qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me', { qux: 'qix' });
        });
    });
  });

  describe('updateMe()', () => {
    it('should make a request to `PATCH /me`', () => {
      return sdk.updateMe({
        address: 'baz',
        birthdate: 'bez',
        country: 'biz',
        firstName: 'boz',
        identity: 'buz',
        lastName: 'qax',
        password: 'qex',
        settings: 'qix',
        state: 'qox',
        username: 'qux'
      }, false, { fiz: 'faz' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me', {
            body: {
              address: 'baz',
              birthdate: 'bez',
              country: 'biz',
              firstName: 'boz',
              identity: 'buz',
              lastName: 'qax',
              password: 'qex',
              settings: 'qix',
              state: 'qox',
              username: 'qux'
            },
            fiz: 'faz',
            method: 'patch'
          });
        });
    });

    it('should make a request to `PATCH /me` with otp', () => {
      return sdk.updateMe({
        address: 'bar'
      }, 'biz', {
        headers: {
          baz: 'buz'
        }
      })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me', {
            body: {
              address: 'bar'
            },
            headers: {
              baz: 'buz',
              'otp-token': 'biz'
            },
            method: 'patch'
          });
        });
    });
  });
});
