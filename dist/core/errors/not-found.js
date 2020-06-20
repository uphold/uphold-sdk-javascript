"use strict";

exports.__esModule = true;
exports.NotFoundError = void 0;

var _base = require("./base");

class NotFoundError extends _base.BaseError {
  static hasError({
    status
  } = {}) {
    return status === 404;
  }

  constructor() {
    super('not_found', ...arguments);
  }

}

exports.NotFoundError = NotFoundError;