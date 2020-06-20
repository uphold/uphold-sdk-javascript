"use strict";

exports.__esModule = true;
exports.buildBearerAuthorizationHeader = buildBearerAuthorizationHeader;
exports.buildBody = buildBody;
exports.buildBasicAuthorizationHeader = buildBasicAuthorizationHeader;
exports.normalizeURI = normalizeURI;
exports.buildUrl = buildUrl;

var _querystring = require("querystring");

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
  const credentials = new Buffer(`${username}:${password}`).toString('base64');
  return {
    authorization: `Basic ${credentials}`
  };
}

function normalizeURI(uri) {
  return uri[0] !== '/' ? uri : uri.slice(1);
}

function buildUrl(uri, baseUrl, version, queryParams) {
  // Check if the `uri` is actually an url.
  if (new RegExp(/^http(s?):\/\//).test(uri)) {
    return uri;
  }

  uri = normalizeURI(uri);

  if (queryParams) {
    uri = `${uri}?${(0, _querystring.stringify)(queryParams)}`;
  }

  return version ? `${baseUrl}/${version}/${uri}` : `${baseUrl}/${uri}`;
}