'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalServerError = undefined;

var _base = require('./base');

class InternalServerError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let status = _ref.status;

    return status === 500;
  }

  constructor() {
    super('internal_server', ...arguments);
  }
}
exports.InternalServerError = InternalServerError;