'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseError = undefined;

var _standardError = require('standard-error');

var _standardError2 = _interopRequireDefault(_standardError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseError extends _standardError2.default {}
exports.BaseError = BaseError;