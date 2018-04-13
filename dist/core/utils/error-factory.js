'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createError = createError;

var _errors = require('../errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createError(error, response) {
  for (const SDKError of _errors2.default) {
    if (SDKError.hasError && SDKError.hasError(error)) {
      return new SDKError(_extends({}, error, { response: response }));
    }
  }
}