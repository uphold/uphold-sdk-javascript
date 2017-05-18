'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCard = createCard;
exports.getCard = getCard;
exports.getCards = getCards;
exports.updateCard = updateCard;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCard(currency, label, options) {
  return this.api('/me/cards', (0, _lodash2.default)({
    body: {
      currency: currency,
      label: label
    },
    method: 'post'
  }, options));
}

function getCard(cardId, options) {
  return this.api(`/me/cards/${cardId}`, options);
}

function getCards(page, itemsPerPage, options) {
  return this.paginate('/me/cards', page, itemsPerPage, options);
}

function updateCard(cardId, label, options) {
  return this.api(`/me/cards/${cardId}`, (0, _lodash2.default)({
    body: {
      label: label
    },
    method: 'patch'
  }, options));
}