import { Client, createError } from '../../core';
import got from 'got';

export default class RequestClient extends Client {

  request(url, method, body, headers = {}, options) { // eslint-disable-line max-params
    return got({
      ...options,
      body,
      headers: {
        ...this.defaultHeaders,
        ...headers
      },
      https: {
        rejectUnauthorized: false
      },
      method,
      url
    })
      .then(response => this._formatResponse(response))
      .catch(response => Promise.reject(response.response ? createError(this._formatResponse(response.response), response) : response));
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
