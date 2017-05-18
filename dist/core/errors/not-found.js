'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = undefined;

var _base = require('./base');

class NotFoundError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let status = _ref.status;

    return status === 404;
  }

  constructor() {
    super('not_found', ...arguments);
  }
}
exports.NotFoundError = NotFoundError;