import merge from 'lodash.merge';

export function createCardAddress(cardId, network, options) {
  return this.api(`/me/cards/${cardId}/addresses`, merge({
    body: {
      network
    },
    method: 'post'
  }, options));
}

export function getCardAddresses(cardId, options) {
  return this.api(`/me/cards/${cardId}/addresses`, options);
}
