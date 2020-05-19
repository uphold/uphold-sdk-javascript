"use strict";

exports.__esModule = true;
exports.default = void 0;

var _services = require("./services");

var _core = _interopRequireDefault(require("../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _default extends _core.default {
  constructor() {
    super(...arguments);
    this.client = new _services.RequestClient();
    this.storage = new _services.CacheStorage();
  }

}

exports.default = _default;