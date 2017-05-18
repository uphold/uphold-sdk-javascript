'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizationRequiredError = undefined;

var _base = require('./base');

class AuthorizationRequiredError extends _base.BaseError {
  constructor() {
    super('authorization_required', ...arguments);
  }
}
exports.AuthorizationRequiredError = AuthorizationRequiredError;