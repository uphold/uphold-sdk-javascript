'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationFailedError = undefined;

var _base = require('./base');

class ValidationFailedError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let body = _ref.body;

    return body && body.code === 'validation_failed';
  }

  constructor() {
    super('validation_failed', ...arguments);
  }
}
exports.ValidationFailedError = ValidationFailedError;