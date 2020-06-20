"use strict";

exports.__esModule = true;
exports.getReserveTransactions = getReserveTransactions;
exports.getReserveTransaction = getReserveTransaction;
exports.getReserveStatistics = getReserveStatistics;
exports.getReserveLedger = getReserveLedger;

function getReserveTransactions(page, itemsPerPage, options) {
  return this.paginate('/reserve/transactions', page, itemsPerPage, options);
}

function getReserveTransaction(transactionId, options) {
  return this.api(`/reserve/transactions/${transactionId}`, options);
}

function getReserveStatistics(options) {
  return this.api('/reserve/statistics', Object.assign({
    authenticate: false
  }, options));
}

function getReserveLedger(page, itemsPerPage, options) {
  return this.paginate('/reserve/ledger', page, itemsPerPage, options);
}