import merge from 'lodash/merge';

export function createCard(currency, label, options) {
  return this.api('/me/cards', merge({
    body: {
      currency,
      label
    },
    method: 'post'
  }, options));
}

export function getCard(cardId, options) {
  return this.api(`/me/cards/${cardId}`, options);
}

export function getCards(page, itemsPerPage, options) {
  return this.paginate('/me/cards', page, itemsPerPage, options);
}

export function updateCard(cardId, label, options) {
  return this.api(`/me/cards/${cardId}`, merge({
    body: {
      label
    },
    method: 'patch'
  }, options));
}
