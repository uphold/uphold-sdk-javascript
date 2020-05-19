"use strict";

exports.__esModule = true;
exports.getMe = getMe;
exports.updateMe = updateMe;

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMe(options) {
  return this.api('/me', options);
}

function updateMe({
  address,
  birthdate,
  country,
  firstName,
  identity,
  lastName,
  settings,
  state,
  username
}, otp, options) {
  options = (0, _merge.default)({
    body: {
      address,
      birthdate,
      country,
      firstName,
      identity,
      lastName,
      settings,
      state,
      username
    },
    method: 'patch'
  }, options);

  if (otp) {
    options.headers = Object.assign({
      'otp-token': otp
    }, options.headers);
  }

  return this.api('/me', options);
}