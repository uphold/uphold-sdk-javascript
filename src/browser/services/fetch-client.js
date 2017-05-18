import { Client, createError } from '../../core';
import isHtml from 'is-html';

export default class FetchClient extends Client {
  request(url, method = 'get', body, headers = {}) {
    const options = {
      body,
      cache: 'no-cache',
      credentials: 'omit',
      headers: new Headers({
        ...this.defaultHeaders,
        ...headers
      }),
      method: method.toUpperCase(),
      mode: 'cors'
    };

    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.text()
          .then(this._parseText)
          .then(body => this._formatResponse(response, body));
      })
      .catch(error => {
        if (!error.json) {
          return Promise.reject(createError(this._formatResponse({ error, status: -1 })));
        }

        return error.text()
          .then(this._parseText)
          .then(body => Promise.reject(createError(this._formatResponse(error, body))));
      });
  }

  _formatResponse(response, body = null) {
    return {
      body,
      headers: this._parseHeaders(response.headers),
      status: response.status,
      url: response.url
    };
  }

  _parseHeaders(responseHeaders) {
    const headers = {};

    if (!responseHeaders) {
      return headers;
    }

    responseHeaders.forEach((value, header) => {
      headers[header] = value;
    });

    return headers;
  }

  _parseText(text) {
    if (!text || isHtml(text)) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
}
