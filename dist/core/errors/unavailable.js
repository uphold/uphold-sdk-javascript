'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnavailableError = undefined;

var _base = require('./base');

class UnavailableError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let status = _ref.status;

    return status <= 0;
  }

  constructor() {
    super('unavailable', ...arguments);
  }
}
exports.UnavailableError = UnavailableError;