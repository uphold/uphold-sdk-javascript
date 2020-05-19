"use strict";

exports.__esModule = true;
exports.RateLimitError = void 0;

var _base = require("./base");

class RateLimitError extends _base.BaseError {
  static hasError({
    status
  } = {}) {
    return status === 429;
  }

  constructor(response) {
    const properties = Object.assign({}, response);

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