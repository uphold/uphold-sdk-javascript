"use strict";

exports.__esModule = true;
exports.default = void 0;

var _contentRange = _interopRequireDefault(require("content-range"));

var _merge = _interopRequireDefault(require("lodash/merge"));

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

  getPage(page = 1, options) {
    return this.sdk.api(this.uri, (0, _merge.default)({
      headers: {
        range: `items=${(page - 1) * this.itemsPerPage}-${page * this.itemsPerPage - 1}`
      }
    }, this.options, options, {
      raw: true
    })).then(({
      body,
      headers
    }) => {
      const {
        first,
        length
      } = _contentRange.default.parse(headers['content-range']);

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