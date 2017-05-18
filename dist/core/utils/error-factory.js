'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createError = createError;

var _errors = require('../errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createError(response) {
  for (const SDKError of _errors2.default) {
    if (SDKError.hasError && SDKError.hasError(response)) {
      return new SDKError(response);
    }
  }
}