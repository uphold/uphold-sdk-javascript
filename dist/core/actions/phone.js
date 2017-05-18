'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhones = getPhones;
function getPhones(options) {
  return this.api('/me/phones', options);
}