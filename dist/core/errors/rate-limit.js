'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateLimitError = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _base = require('./base');

class RateLimitError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let status = _ref.status;

    return status === 429;
  }

  constructor(response) {
    const properties = _extends({}, response);

    if (response.headers) {
      const headers = ['limit', 'remaining', 'reset'];

      headers.forEach(header => {
        const headerName = `rate-limit-${header}`;

        if (response.headers[headerName]) {
          properties[header] = response.headers[headerName];
        }
      });
    }

    super('rate_limit', properties);
  }

  getRateLimitData() {
    return {
      limit: this.limit,
      remaining: this.remaining,
      reset: this.reset
    };
  }
}
exports.RateLimitError = RateLimitError;