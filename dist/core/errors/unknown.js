"use strict";

exports.__esModule = true;
exports.UnknownError = void 0;

var _base = require("./base");

class UnknownError extends _base.BaseError {
  static hasError() {
    return true;
  }

  constructor() {
    super('unknown', ...arguments);
  }

}

exports.UnknownError = UnknownError;