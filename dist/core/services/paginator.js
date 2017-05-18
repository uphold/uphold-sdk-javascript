'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contentRange = require('content-range');

var _contentRange2 = _interopRequireDefault(_contentRange);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Paginator {
  constructor(sdk, uri, itemsPerPage, options) {
    this.itemsPerPage = itemsPerPage;
    this.options = options;
    this.sdk = sdk;
    this.uri = uri;
  }

  getNextPage(options) {
    return this.hasNextPage() ? this.getPage(this.currentPage + 1, options) : Promise.resolve();
  }

  getPage() {
    let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    let options = arguments[1];

    return this.sdk.api(this.uri, (0, _lodash2.default)({
      headers: {
        range: `items=${(page - 1) * this.itemsPerPage}-${page * this.itemsPerPage - 1}`
      }
    }, this.options, options, { raw: true })).then((_ref) => {
      let body = _ref.body,
          headers = _ref.headers;

      var _contentRange$parse = _contentRange2.default.parse(headers['content-range']);

      const first = _contentRange$parse.first,
            length = _contentRange$parse.length;


      this.currentPage = length ? first / this.itemsPerPage + 1 : null;
      this.headers = headers;
      this.items = body;
      this.itemsCount = length;
      this.pagesCount = Math.ceil(length / this.itemsPerPage);

      return this;
    });
  }

  getPreviousPage(options) {
    return this.hasPreviousPage() ? this.getPage(this.currentPage - 1, options) : Promise.resolve();
  }

  hasNextPage() {
    return !!this.currentPage && this.currentPage < this.pagesCount;
  }

  hasPreviousPage() {
    return !!this.currentPage && this.currentPage > 1;
  }
}
exports.default = Paginator;