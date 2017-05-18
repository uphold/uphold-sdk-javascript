import merge from 'lodash.merge';

export function createContact({ addresses, company, emails, firstName, lastName }, options) {
  return this.api('/me/contacts', merge({
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

export function getContact(contactId, options) {
  return this.api(`/me/contacts/${contactId}`, options);
}

export function getContacts(options) {
  return this.api('/me/contacts', options);
}

export function updateContact(contactId, { addresses, company, emails, firstName, lastName }, options) {
  return this.api(`/me/contacts/${contactId}`, merge({
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
