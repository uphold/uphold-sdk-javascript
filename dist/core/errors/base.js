"use strict";

exports.__esModule = true;
exports.BaseError = void 0;

var _standardError = _interopRequireDefault(require("standard-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseError extends _standardError.default {}

exports.BaseError = BaseError;