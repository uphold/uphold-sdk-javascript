"use strict";

exports.__esModule = true;
exports.default = void 0;

var _authorizationRequired = require("./authorization-required");

exports.AuthorizationRequiredError = _authorizationRequired.AuthorizationRequiredError;

var _base = require("./base");

exports.BaseError = _base.BaseError;

var _forbidden = require("./forbidden");

exports.ForbiddenError = _forbidden.ForbiddenError;

var _internalServer = require("./internal-server");

exports.InternalServerError = _internalServer.InternalServerError;

var _invalidScope = require("./invalid-scope");

exports.InvalidScopeError = _invalidScope.InvalidScopeError;

var _notFound = require("./not-found");

exports.NotFoundError = _notFound.NotFoundError;

var _otpRequired = require("./otp-required");

exports.OTPRequiredError = _otpRequired.OTPRequiredError;

var _rateLimit = require("./rate-limit");

exports.RateLimitError = _rateLimit.RateLimitError;

var _unauthorized = require("./unauthorized");

exports.UnauthorizedError = _unauthorized.UnauthorizedError;

var _unavailable = require("./unavailable");

exports.UnavailableError = _unavailable.UnavailableError;

var _unknown = require("./unknown");

exports.UnknownError = _unknown.UnknownError;

var _validationFailed = require("./validation-failed");

exports.ValidationFailedError = _validationFailed.ValidationFailedError;
var _default = [_authorizationRequired.AuthorizationRequiredError, _forbidden.ForbiddenError, _internalServer.InternalServerError, _invalidScope.InvalidScopeError, _notFound.NotFoundError, _otpRequired.OTPRequiredError, _rateLimit.RateLimitError, _unauthorized.UnauthorizedError, _unavailable.UnavailableError, _validationFailed.ValidationFailedError, _unknown.UnknownError];
exports.default = _default;