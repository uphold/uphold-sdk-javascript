'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildBearerAuthorizationHeader = buildBearerAuthorizationHeader;
exports.buildBody = buildBody;
exports.buildBasicAuthorizationHeader = buildBasicAuthorizationHeader;
exports.normalizeURI = normalizeURI;
exports.buildUrl = buildUrl;

var _textEncoding = require('text-encoding');

var _qs = require('qs');

var _base64Js = require('base64-js');

var _base64Js2 = _interopRequireDefault(_base64Js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildBearerAuthorizationHeader(token) {
  return {
    authorization: `Bearer ${token}`
  };
}

function buildBody(data) {
  const keys = Object.keys(data);

  if (!keys.length) {
    return;
  }

  return keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
}

function buildBasicAuthorizationHeader(username, password) {
  const credentials = _base64Js2.default.fromByteArray(new _textEncoding.TextEncoder().encode(`${username}:${password}`));

  return { authorization: `Basic ${credentials}` };
}

function normalizeURI(uri) {
  return uri[0] !== '/' ? uri : uri.slice(1);
}

function buildUrl(uri, baseUrl, version, queryParams) {
  // Check if the `uri` is actually an url.
  if (new RegExp(/^http(s?)\:\/\//).test(uri)) {
    return uri;
  }

  uri = normalizeURI(uri);

  if (queryParams) {
    uri = `${uri}?${(0, _qs.stringify)(queryParams)}`;
  }

  return version ? `${baseUrl}/${version}/${uri}` : `${baseUrl}/${uri}`;
}