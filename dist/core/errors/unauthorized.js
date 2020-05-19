"use strict";

exports.__esModule = true;
exports.UnauthorizedError = void 0;

var _base = require("./base");

class UnauthorizedError extends _base.BaseError {
  static hasError({
    body,
    status
  } = {}) {
    if (!status || !body || !body.error) {
      return false;
    }

    if (status === 400 && (body.error === 'invalid_request' || body.error === 'invalid_grant')) {
      return true;
    }

    if (status === 401 && body.error === 'invalid_token') {
      return true;
    }

    return false;
  }

  constructor() {
    super('unauthorized', ...arguments);
  }

}

exports.UnauthorizedError = UnauthorizedError;