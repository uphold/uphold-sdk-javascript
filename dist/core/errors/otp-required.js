"use strict";

exports.__esModule = true;
exports.OTPRequiredError = void 0;

var _base = require("./base");

var _includes = _interopRequireDefault(require("lodash/includes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OTPRequiredError extends _base.BaseError {
  static hasError({
    headers
  } = {}) {
    if (!headers || !headers['otp-token']) {
      return false;
    }

    return (0, _includes.default)(['OPTIONAL', 'REQUIRED'], headers['otp-token'].toUpperCase());
  }

  constructor() {
    super('otp_required', ...arguments);
  }

}

exports.OTPRequiredError = OTPRequiredError;