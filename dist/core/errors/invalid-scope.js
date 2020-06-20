"use strict";

exports.__esModule = true;
exports.InvalidScopeError = void 0;

var _base = require("./base");

class InvalidScopeError extends _base.BaseError {
  static hasError({
    body,
    status
  } = {}) {
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