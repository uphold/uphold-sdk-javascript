'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = undefined;

var _base = require('./base');

class UnauthorizedError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let body = _ref.body,
        status = _ref.status;

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