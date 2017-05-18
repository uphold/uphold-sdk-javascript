'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDocument = createDocument;
exports.getDocuments = getDocuments;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDocument(type, value, options) {
  return this.api('/me/documents', (0, _lodash2.default)({
    body: {
      type: type,
      value: value
    },
    method: 'post'
  }, options));
}

function getDocuments(options) {
  return this.api('/me/documents', options);
}