'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.cancelCardTransaction = cancelCardTransaction;
exports.commitCardTransaction = commitCardTransaction;
exports.createCardTransaction = createCardTransaction;
exports.getCardTransactions = getCardTransactions;
exports.resendCardTransaction = resendCardTransaction;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cancelCardTransaction(cardId, transactionId, options) {
  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/cancel`, _extends({
    method: 'post'
  }, options));
}

// eslint-disable-next-line max-params
function commitCardTransaction(cardId, transactionId, _ref, otp, options) {
  let message = _ref.message,
      securityCode = _ref.securityCode;

  options = (0, _lodash2.default)({
    body: {
      message: message,
      securityCode: securityCode
    },
    method: 'post'
  }, options);

  if (otp) {
    options.headers = _extends({
      'otp-token': otp
    }, options.headers);
  }

  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/commit`, options);
}

// eslint-disable-next-line max-params
function createCardTransaction(cardId, _ref2, commit, otp, options) {
  let amount = _ref2.amount,
      currency = _ref2.currency,
      destination = _ref2.destination,
      origin = _ref2.origin,
      message = _ref2.message,
      securityCode = _ref2.securityCode;

  options = (0, _lodash2.default)({
    body: {
      denomination: {
        amount: amount,
        currency: currency
      },
      destination: destination,
      message: message,
      origin: origin,
      securityCode: securityCode
    },
    method: 'post'
  }, options);

  if (commit) {
    options.queryParams = _extends({
      commit: true
    }, options.queryParams);
  }

  if (otp) {
    options.headers = _extends({
      'otp-token': otp
    }, options.headers);
  }

  return this.api(`/me/cards/${cardId}/transactions`, options);
}

function getCardTransactions(cardId, page, itemsPerPage, options) {
  return this.paginate(`/me/cards/${cardId}/transactions`, page, itemsPerPage, options);
}

function resendCardTransaction(cardId, transactionId, options) {
  return this.api(`/me/cards/${cardId}/transactions/${transactionId}/resend`, _extends({
    method: 'post'
  }, options));
}