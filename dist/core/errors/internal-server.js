"use strict";

exports.__esModule = true;
exports.InternalServerError = void 0;

var _base = require("./base");

class InternalServerError extends _base.BaseError {
  static hasError({
    status
  } = {}) {
    return status === 500;
  }

  constructor() {
    super('internal_server', ...arguments);
  }

}

exports.InternalServerError = InternalServerError;