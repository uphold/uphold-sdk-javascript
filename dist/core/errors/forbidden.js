"use strict";

exports.__esModule = true;
exports.ForbiddenError = void 0;

var _base = require("./base");

class ForbiddenError extends _base.BaseError {
  static hasError({
    status
  } = {}) {
    return status === 403;
  }

  constructor() {
    super('forbidden', ...arguments);
  }

}

exports.ForbiddenError = ForbiddenError;