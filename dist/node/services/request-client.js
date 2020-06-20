"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("../../core");

var _errors = require("request-promise/errors");

var _requestPromise = _interopRequireDefault(require("request-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestClient extends _core.Client {
  request(url, method, body, headers = {}, options) {
    // eslint-disable-line max-params
    return (0, _requestPromise.default)(Object.assign({}, options, {
      body,
      headers: Object.assign({}, this.defaultHeaders, headers),
      method,
      resolveWithFullResponse: true,
      strictSSL: false,
      url
    })).then(response => this._formatResponse(response)).catch(response => Promise.reject(response instanceof _errors.RequestError ? response : (0, _core.createError)(this._formatResponse(response.response), response)));
  }

  _formatResponse({
    body,
    headers,
    statusCode
  }) {
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

exports.default = RequestClient;