export function getAccount(accountId, options) {
  return this.api(`/me/accounts/${accountId}`, options);
}

export function getAccounts(options) {
  return this.api('/me/accounts', options);
}
