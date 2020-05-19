"use strict";

exports.__esModule = true;
exports.UnavailableError = void 0;

var _base = require("./base");

class UnavailableError extends _base.BaseError {
  static hasError({
    status
  } = {}) {
    return status <= 0;
  }

  constructor() {
    super('unavailable', ...arguments);
  }

}

exports.UnavailableError = UnavailableError;