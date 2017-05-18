'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationFailedError = exports.UnknownError = exports.UnavailableError = exports.UnauthorizedError = exports.RateLimitError = exports.OTPRequiredError = exports.NotFoundError = exports.InternalServerError = exports.ForbiddenError = exports.BaseError = exports.AuthorizationRequiredError = undefined;

var _authorizationRequired = require('./authorization-required');

var _base = require('./base');

var _forbidden = require('./forbidden');

var _internalServer = require('./internal-server');

var _notFound = require('./not-found');

var _otpRequired = require('./otp-required');

var _rateLimit = require('./rate-limit');

var _unauthorized = require('./unauthorized');

var _unavailable = require('./unavailable');

var _unknown = require('./unknown');

var _validationFailed = require('./validation-failed');

exports.AuthorizationRequiredError = _authorizationRequired.AuthorizationRequiredError;
exports.BaseError = _base.BaseError;
exports.ForbiddenError = _forbidden.ForbiddenError;
exports.InternalServerError = _internalServer.InternalServerError;
exports.NotFoundError = _notFound.NotFoundError;
exports.OTPRequiredError = _otpRequired.OTPRequiredError;
exports.RateLimitError = _rateLimit.RateLimitError;
exports.UnauthorizedError = _unauthorized.UnauthorizedError;
exports.UnavailableError = _unavailable.UnavailableError;
exports.UnknownError = _unknown.UnknownError;
exports.ValidationFailedError = _validationFailed.ValidationFailedError;
exports.default = [_authorizationRequired.AuthorizationRequiredError, _forbidden.ForbiddenError, _internalServer.InternalServerError, _notFound.NotFoundError, _otpRequired.OTPRequiredError, _rateLimit.RateLimitError, _unauthorized.UnauthorizedError, _unavailable.UnavailableError, _validationFailed.ValidationFailedError, _unknown.UnknownError];