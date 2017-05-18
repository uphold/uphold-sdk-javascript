'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _services = require('./services');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _core2.default {
  constructor() {
    super(...arguments);

    this.client = new _services.RequestClient();
    this.storage = new _services.CacheStorage();
  }
};