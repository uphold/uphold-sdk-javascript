import merge from 'lodash.merge';

export function cancelCardTransaction(cardId, transactionId, options) {
  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/cancel`, {
    method: 'post',
    ...options
  });
}

// eslint-disable-next-line max-params
export function commitCardTransaction(cardId, transactionId, { message, securityCode }, otp, options) {
  options = merge({
    body: {
      message,
      securityCode
    },
    method: 'post'
  }, options);

  if (otp) {
    options.headers = {
      'otp-token': otp,
      ...options.headers
    };
  }

  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/commit`, options);
}

// eslint-disable-next-line max-params
export function createCardTransaction(cardId, { amount, currency, destination, origin, message, securityCode }, commit, otp, options) {
  options = merge({
    body: {
      denomination: {
        amount,
        currency
      },
      destination,
      message,
      origin,
      securityCode
    },
    method: 'post'
  }, options);

  if (commit) {
    options.queryParams = {
      commit: true,
      ...options.queryParams
    };
  }

  if (otp) {
    options.headers = {
      'otp-token': otp,
      ...options.headers
    };
  }

  return this.api(`/me/cards/${cardId}/transactions`, options);
}

export function getCardTransactions(cardId, page, itemsPerPage, options) {
  return this.paginate(`/me/cards/${cardId}/transactions`, page, itemsPerPage, options);
}

export function resendCardTransaction(cardId, transactionId, options) {
  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/resend`, {
    method: 'post',
    ...options
  });
}
