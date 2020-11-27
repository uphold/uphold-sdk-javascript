import { NotFoundError, RequestClient } from '../../../src/node';
import { RequestError } from 'got';
import nock from 'nock';

describe('RequestClient', () => {
  describe('request()', () => {
    const url = 'https://api.uphold.com/';

    it('should return formatted response if status is 200', () => {
      nock(url)
        .get('/')
        .reply(200, JSON.stringify(['foo']), { 'Biz-Baz': 'buz' });

      return new RequestClient().request(url, 'get')
        .then(response => {
          expect(response).toEqual({ body: ['foo'], headers: { 'biz-baz': 'buz' }, status: 200 });
        });
    });

    it('should handle a text response', () => {
      nock(url)
        .get('/')
        .reply(200, 'foo');

      return new RequestClient().request(url, 'get')
        .then(response => {
          expect(response).toEqual({ body: 'foo', headers: {}, status: 200 });
        });
    });

    it('should throw a standard error if status is not 200', done => {
      nock(url)
        .get('/')
        .reply(404, { foo: 'bar' }, { 'Biz-Baz': 'buz' });

      return new RequestClient().request(url, 'get')
        .catch(e => {
          expect(e).toBeInstanceOf(NotFoundError);
          expect(e.body).toEqual({ foo: 'bar' });
          expect(e.headers['biz-baz']).toBe('buz');
          expect(e.message).toBe('not_found');
          expect(e.name).toBe('NotFoundError');
          expect(e.status).toBe(404);
          done();
        });
    });

    it('should throw an unhandled error', done => {
      return new RequestClient().request()
        .catch(e => {
          expect(e).toBeInstanceOf(RequestError);
          done();
        });
    });
  });
});
