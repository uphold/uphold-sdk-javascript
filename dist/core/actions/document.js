"use strict";

exports.__esModule = true;
exports.createDocument = createDocument;
exports.getDocuments = getDocuments;

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDocument(type, value, options) {
  return this.api('/me/documents', (0, _merge.default)({
    body: {
      type,
      value
    },
    method: 'post'
  }, options));
}

function getDocuments(options) {
  return this.api('/me/documents', options);
}