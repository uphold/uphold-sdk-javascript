"use strict";

exports.__esModule = true;
exports.AuthorizationRequiredError = void 0;

var _base = require("./base");

class AuthorizationRequiredError extends _base.BaseError {
  constructor() {
    super('authorization_required', ...arguments);
  }

}

exports.AuthorizationRequiredError = AuthorizationRequiredError;