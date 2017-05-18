export function getReserveTransactions(page, itemsPerPage, options) {
  return this.paginate('/reserve/transactions', page, itemsPerPage, options);
}

export function getReserveTransaction(transactionId, options) {
  return this.api(`/reserve/transactions/${transactionId}`, options);
}

export function getReserveStatistics(options) {
  return this.api('/reserve/statistics', {
    authenticate: false,
    ...options
  });
}

export function getReserveLedger(page, itemsPerPage, options) {
  return this.paginate('/reserve/ledger', page, itemsPerPage, options);
}
