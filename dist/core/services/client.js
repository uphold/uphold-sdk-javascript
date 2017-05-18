'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../../package.json');

class Client {
  constructor() {
    this.defaultHeaders = { 'user-agent': `${_package.name}/${_package.version}` };
  }
}
exports.default = Client;