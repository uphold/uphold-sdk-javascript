import merge from 'lodash/merge';

export function createDocument(type, value, options) {
  return this.api('/me/documents', merge({
    body: {
      type,
      value
    },
    method: 'post'
  }, options));
}

export function getDocuments(options) {
  return this.api('/me/documents', options);
}
