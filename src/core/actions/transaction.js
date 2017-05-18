export function getTransaction(transactionId, options) {
  return this.api(`/me/transactions/${transactionId}`, options);
}

export function getTransactions(page, itemsPerPage, options) {
  return this.paginate('/me/transactions', page, itemsPerPage, options);
}
