'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  return this.api('/reserve/statistics', _extends({
    authenticate: false
  }, options));
}

function getReserveLedger(page, itemsPerPage, options) {
  return this.paginate('/reserve/ledger', page, itemsPerPage, options);
}