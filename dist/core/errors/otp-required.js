'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPRequiredError = undefined;

var _base = require('./base');

var _lodash = require('lodash');

class OTPRequiredError extends _base.BaseError {
  static hasError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let headers = _ref.headers;

    if (!headers || !headers['otp-token']) {
      return false;
    }

    return (0, _lodash.includes)(['OPTIONAL', 'REQUIRED'], headers['otp-token'].toUpperCase());
  }

  constructor() {
    super('otp_required', ...arguments);
  }
}
exports.OTPRequiredError = OTPRequiredError;