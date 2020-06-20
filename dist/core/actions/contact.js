"use strict";

exports.__esModule = true;
exports.createContact = createContact;
exports.getContact = getContact;
exports.getContacts = getContacts;
exports.updateContact = updateContact;

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createContact({
  addresses,
  company,
  emails,
  firstName,
  lastName
}, options) {
  return this.api('/me/contacts', (0, _merge.default)({
    body: {
      addresses,
      company,
      emails,
      firstName,
      lastName
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

function updateContact(contactId, {
  addresses,
  company,
  emails,
  firstName,
  lastName
}, options) {
  return this.api(`/me/contacts/${contactId}`, (0, _merge.default)({
    body: {
      addresses,
      company,
      emails,
      firstName,
      lastName
    },
    method: 'patch'
  }, options));
}