'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContact = createContact;
exports.getContact = getContact;
exports.getContacts = getContacts;
exports.updateContact = updateContact;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createContact(_ref, options) {
  let addresses = _ref.addresses,
      company = _ref.company,
      emails = _ref.emails,
      firstName = _ref.firstName,
      lastName = _ref.lastName;

  return this.api('/me/contacts', (0, _lodash2.default)({
    body: {
      addresses: addresses,
      company: company,
      emails: emails,
      firstName: firstName,
      lastName: lastName
    },
    method: 'post'
  }, options));
}

function getContact(contactId, options) {
  return this.api(`/me/contacts/${contactId}`, options);
}

function getContacts(options) {
  return this.api('/me/contacts', options);
}

function updateContact(contactId, _ref2, options) {
  let addresses = _ref2.addresses,
      company = _ref2.company,
      emails = _ref2.emails,
      firstName = _ref2.firstName,
      lastName = _ref2.lastName;

  return this.api(`/me/contacts/${contactId}`, (0, _lodash2.default)({
    body: {
      addresses: addresses,
      company: company,
      emails: emails,
      firstName: firstName,
      lastName: lastName
    },
    method: 'patch'
  }, options));
}