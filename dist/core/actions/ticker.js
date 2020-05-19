"use strict";

exports.__esModule = true;
exports.getTicker = getTicker;

function getTicker(pair, options) {
  return this.api(`/ticker${pair ? `/${pair}` : ''}`, Object.assign({
    authenticate: false
  }, options));
}