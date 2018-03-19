import { Client, createError } from '../../core';
import { RequestError } from 'request-promise/errors';
import request from 'request-promise';

export default class RequestClient extends Client {
  request(url, method, body, headers = {}, options) { // eslint-disable-line max-params
    return request({
      ...options,
      body,
      headers: {
        ...this.defaultHeaders,
        ...headers
      },
      method,
      resolveWithFullResponse: true,
      strictSSL: false,
      url
    })
      .then(response => this._formatResponse(response))
      .catch(response => Promise.reject(response instanceof RequestError ? response : createError(this._formatResponse(response.response), response)));
  }

  _formatResponse({ body, headers, statusCode }) {
    return {
      body: this._parseBody(body),
      headers,
      status: statusCode
    };
  }

  _parseBody(body) {
    try {
      return JSON.parse(body);
    } catch (e) {
      return body;
    }
  }
}
