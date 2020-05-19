"use strict";

exports.__esModule = true;
exports.cancelCardTransaction = cancelCardTransaction;
exports.commitCardTransaction = commitCardTransaction;
exports.createCardTransaction = createCardTransaction;
exports.getCardTransactions = getCardTransactions;
exports.resendCardTransaction = resendCardTransaction;

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cancelCardTransaction(cardId, transactionId, options) {
  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/cancel`, Object.assign({
    method: 'post'
  }, options));
} // eslint-disable-next-line max-params


function commitCardTransaction(cardId, transactionId, {
  message,
  securityCode
}, otp, options) {
  options = (0, _merge.default)({
    body: {
      message,
      securityCode
    },
    method: 'post'
  }, options);

  if (otp) {
    options.headers = Object.assign({
      'otp-token': otp
    }, options.headers);
  }

  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/commit`, options);
} // eslint-disable-next-line max-params


function createCardTransaction(cardId, {
  amount,
  currency,
  destination,
  message,
  origin,
  securityCode
}, commit, otp, options) {
  options = (0, _merge.default)({
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
    options.queryParams = Object.assign({
      commit: true
    }, options.queryParams);
  }

  if (otp) {
    options.headers = Object.assign({
      'otp-token': otp
    }, options.headers);
  }

  return this.api(`/me/cards/${cardId}/transactions`, options);
}

function getCardTransactions(cardId, page, itemsPerPage, options) {
  return this.paginate(`/me/cards/${cardId}/transactions`, page, itemsPerPage, options);
}

function resendCardTransaction(cardId, transactionId, options) {
  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/resend`, Object.assign({
    method: 'post'
  }, options));
}