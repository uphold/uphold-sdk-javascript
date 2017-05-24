'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getMe = getMe;
exports.updateMe = updateMe;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMe(options) {
  return this.api('/me', options);
}

function updateMe(_ref, otp, options) {
  let address = _ref.address,
      birthdate = _ref.birthdate,
      country = _ref.country,
      firstName = _ref.firstName,
      identity = _ref.identity,
      lastName = _ref.lastName,
      settings = _ref.settings,
      state = _ref.state,
      username = _ref.username;

  options = (0, _lodash2.default)({
    body: {
      address: address,
      birthdate: birthdate,
      country: country,
      firstName: firstName,
      identity: identity,
      lastName: lastName,
      settings: settings,
      state: state,
      username: username
    },
    method: 'patch'
  }, options);

  if (otp) {
    options.headers = _extends({
      'otp-token': otp
    }, options.headers);
  }

  return this.api('/me', options);
}