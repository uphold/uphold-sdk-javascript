'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccount = getAccount;
exports.getAccounts = getAccounts;
function getAccount(accountId, options) {
  return this.api(`/me/accounts/${accountId}`, options);
}

function getAccounts(options) {
  return this.api('/me/accounts', options);
}