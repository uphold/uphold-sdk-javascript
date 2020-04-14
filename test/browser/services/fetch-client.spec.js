import { FetchClient, NotFoundError, UnavailableError } from '../../../src/browser';
import fetchMock from 'fetch-mock';

describe('FetchClient', () => {
  const client = new FetchClient();

  beforeEach(() => {
    fetchMock.restore();
  });

  describe('request()', () => {
    it('should set `get` as default method if none is provided', () => {
      fetchMock.mock('foo', {});

      return client.request('foo')
        .then(() => {
          expect(fetchMock.lastOptions().method).toEqual('GET');
        });
    });

    it('should send given `body` and `headers`', () => {
      fetchMock.mock('foo', {});

      return client.request('foo', 'post', 'bar', { 'Biz-Baz': 'buz' })
        .then(() => {
          const { body, headers } = fetchMock.lastOptions();

          expect(body).toBe('bar');
          expect(headers.get('biz-baz')).toBe('buz');
        });
    });

    describe('when successful', () => {
      it('should return a formatted response', () => {
        fetchMock.mock('foo', {
          body: 'bar',
          headers: new Headers({ 'Biz-Baz': 'buz' }),
          status: 201
        });

        return client.request('foo')
          .then(result => {
            expect(result.body).toBe('bar');
            expect(result.headers).toEqual({ 'biz-baz': 'buz' });
            expect(result.status).toBe(201);
            expect(result.url).toBe('foo');
          });
      });

      it('should return an empty object in `body` if response is empty', () => {
        fetchMock.mock('foo', { status: 204 });

        return client.request('foo')
          .then(result => {
            expect(result.body).toEqual({});
          });
      });

      it('should return an `ok` string in `body` if response is an `ok` string', () => {
        fetchMock.mock('foo', { body: 'ok', status: 200 });

        return client.request('foo')
          .then(response => {
            expect(response.body).toBe('ok');
          });
      });
    });

    describe('when failed', () => {
      describe('due to a network error', () => {
        it('should reject with an `UnavailableError`', done => {
          fetchMock.mock('foo', { throws: new Error() });

          return client.request('foo')
            .catch(error => {
              expect(error).toBeInstanceOf(UnavailableError);
              done();
            });
        });
      });

      describe('due to an api error', () => {
        it('should return a custom error', done => {
          fetchMock.mock('foo', {
            body: 'foo',
            headers: new Headers({ 'Biz-Baz': 'buz' }),
            status: 404
          });

          return client.request('foo')
            .catch(error => {
              expect(error).toBeInstanceOf(NotFoundError);
              expect(error.body).toBe('foo');
              expect(error.headers).toEqual({ 'biz-baz': 'buz' });
              expect(error.status).toBe(404);
              done();
            });
        });
      });
    });
  });
});
