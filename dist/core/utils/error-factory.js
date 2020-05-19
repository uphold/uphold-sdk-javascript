"use strict";

exports.__esModule = true;
exports.createError = createError;

var _errors = _interopRequireDefault(require("../errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createError(error, response) {
  // eslint-disable-next-line no-unused-vars
  for (const SDKError of _errors.default) {
    if (SDKError.hasError && SDKError.hasError(error)) {
      return new SDKError(Object.assign(Object.assign({}, error), {}, {
        response
      }));
    }
  }
}