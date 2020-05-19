"use strict";

exports.__esModule = true;
exports.getPhones = getPhones;

function getPhones(options) {
  return this.api('/me/phones', options);
}