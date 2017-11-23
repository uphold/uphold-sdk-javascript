'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidScopeError = undefined;

var _base = require('./base');

class InvalidScopeError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let body = _ref.body,
        status = _ref.status;

    if (!status || !body || !body.error) {
      return false;
    }

    if (status === 400 && body.error === 'invalid_scope') {
      return true;
    }

    return false;
  }

  constructor() {
    super('invalid_scope', ...arguments);
  }
}
exports.InvalidScopeError = InvalidScopeError;