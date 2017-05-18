'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMe = getMe;
exports.updateMe = updateMe;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMe(options) {
  return this.api('/me', options);
}

function updateMe(_ref, options) {
  let address = _ref.address,
      birthdate = _ref.birthdate,
      country = _ref.country,
      firstName = _ref.firstName,
      identity = _ref.identity,
      lastName = _ref.lastName,
      settings = _ref.settings,
      state = _ref.state,
      username = _ref.username;

  return this.api('/me', (0, _lodash2.default)({
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
  }, options));
}