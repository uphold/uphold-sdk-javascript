"use strict";

exports.__esModule = true;
exports.ValidationFailedError = void 0;

var _base = require("./base");

class ValidationFailedError extends _base.BaseError {
  static hasError({
    body
  } = {}) {
    return body && body.code === 'validation_failed';
  }

  constructor() {
    super('validation_failed', ...arguments);
  }

}

exports.ValidationFailedError = ValidationFailedError;