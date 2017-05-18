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
        settings: 'qex',
        state: 'qix',
        username: 'qox'
      }, { fiz: 'faz' })
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
              settings: 'qex',
              state: 'qix',
              username: 'qox'
            },
            fiz: 'faz',
            method: 'patch'
          });
        });
    });
  });
});
