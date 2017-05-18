'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCardAddress = createCardAddress;
exports.getCardAddresses = getCardAddresses;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCardAddress(cardId, network, options) {
  return this.api(`/me/cards/${cardId}/addresses`, (0, _lodash2.default)({
    body: {
      network: network
    },
    method: 'post'
  }, options));
}

function getCardAddresses(cardId, options) {
  return this.api(`/me/cards/${cardId}/addresses`, options);
}