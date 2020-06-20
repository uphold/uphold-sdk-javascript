"use strict";

exports.__esModule = true;
exports.createCardAddress = createCardAddress;
exports.getCardAddresses = getCardAddresses;

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCardAddress(cardId, network, options) {
  return this.api(`/me/cards/${cardId}/addresses`, (0, _merge.default)({
    body: {
      network
    },
    method: 'post'
  }, options));
}

function getCardAddresses(cardId, options) {
  return this.api(`/me/cards/${cardId}/addresses`, options);
}