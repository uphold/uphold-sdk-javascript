'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForbiddenError = undefined;

var _base = require('./base');

class ForbiddenError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let status = _ref.status;

    return status === 403;
  }

  constructor() {
    super('forbidden', ...arguments);
  }
}
exports.ForbiddenError = ForbiddenError;