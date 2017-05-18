import SDK from '../../../src/core';

describe('DocumentActions', () => {
  const sdk = new SDK({ clientId: 'foo', clientSecret: 'bar' });

  beforeEach(() => {
    sdk.api = jest.fn(() => Promise.resolve('foo'));
  });

  describe('createDocument()', () => {
    it('should make a request to `POST /me/documents`', () => {
      return sdk.createDocument('bar', 'biz', { qux: 'qix' })
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/documents', { body: { type: 'bar', value: 'biz' }, method: 'post', qux: 'qix' });
        });
    });
  });

  describe('getDocuments()', () => {
    it('should make a request to `GET /me/documents`', () => {
      return sdk.getDocuments('bar')
        .then(result => {
          expect(result).toBe('foo');
          expect(sdk.api).toBeCalledWith('/me/documents', 'bar');
        });
    });
  });
});
