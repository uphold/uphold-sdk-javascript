import SDK from '../../../src/core';

describe('ContactActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('createContact()', () => {
    it('should make a request to `POST /me/contacts`', () => {
      return sdk.createContact({ addresses: 'bar', company: 'baz', emails: 'bez', firstName: 'biz', lastName: 'boz' }, { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/contacts', {
            body: {
              addresses: 'bar',
              company: 'baz',
              emails: 'bez',
              firstName: 'biz',
              lastName: 'boz'
            },
            method: 'post',
            qux: 'qix'
          });
        });
    });
  });

  describe('getContact()', () => {
    it('should make a request to `GET /me/contacts/:contactId`', () => {
      return sdk.getContact('bar', 'biz')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/contacts/bar', 'biz');
        });
    });
  });

  describe('getContacts()', () => {
    it('should make a request to `GET /me/contacts`', () => {
      return sdk.getContacts('bar')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/contacts', 'bar');
        });
    });
  });

  describe('updateContact()', () => {
    it('should make a request to `PATCH /me/contacts/:contactId`', () => {
      return sdk.updateContact('bar', { addresses: 'baz', company: 'bez', emails: 'biz', firstName: 'boz', lastName: 'buz' }, { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/contacts/bar', {
            body: {
              addresses: 'baz',
              company: 'bez',
              emails: 'biz',
              firstName: 'boz',
              lastName: 'buz'
            },
            method: 'patch',
            qux: 'qix'
          });
        });
    });
  });
});
