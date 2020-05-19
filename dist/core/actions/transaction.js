"use strict";

exports.__esModule = true;
exports.getTransaction = getTransaction;
exports.getTransactions = getTransactions;

function getTransaction(transactionId, options) {
  return this.api(`/me/transactions/${transactionId}`, options);
}

function getTransactions(page, itemsPerPage, options) {
  return this.paginate('/me/transactions', page, itemsPerPage, options);
}