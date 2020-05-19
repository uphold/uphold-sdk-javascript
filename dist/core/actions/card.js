"use strict";

exports.__esModule = true;
exports.createCard = createCard;
exports.getCard = getCard;
exports.getCards = getCards;
exports.updateCard = updateCard;

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCard(currency, label, options) {
  return this.api('/me/cards', (0, _merge.default)({
    body: {
      currency,
      label
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
  return this.api(`/me/cards/${cardId}`, (0, _merge.default)({
    body: {
      label
    },
    method: 'patch'
  }, options));
}