'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('../../core');

var _errors = require('request-promise/errors');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestClient extends _core.Client {
  request(url, method, body) {
    let headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let options = arguments[4];
    // eslint-disable-line max-params
    return (0, _requestPromise2.default)(_extends({}, options, {
      body: body,
      headers: _extends({}, this.defaultHeaders, headers),
      method: method,
      resolveWithFullResponse: true,
      strictSSL: false,
      url: url
    })).then(response => this._formatResponse(response)).catch(response => Promise.reject(response instanceof _errors.RequestError ? response : (0, _core.createError)(this._formatResponse(response.response), response)));
  }

  _formatResponse(_ref) {
    let body = _ref.body,
        headers = _ref.headers,
        statusCode = _ref.statusCode;

    return {
      body: this._parseBody(body),
      headers: headers,
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