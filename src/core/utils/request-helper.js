import { TextEncoder } from 'text-encoding';
import { stringify } from 'qs';
import base64 from 'base64-js';

export function buildBearerAuthorizationHeader(token) {
  return {
    authorization: `Bearer ${token}`
  };
}

export function buildBody(data) {
  const keys = Object.keys(data);

  if (!keys.length) {
    return;
  }

  return keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
}

export function buildBasicAuthorizationHeader(username, password) {
  const credentials = base64.fromByteArray(
    new TextEncoder().encode(`${username}:${password}`)
  );

  return { authorization: `Basic ${credentials}` };
}

export function normalizeURI(uri) {
  return uri[0] !== '/' ? uri : uri.slice(1);
}

export function buildUrl(uri, baseUrl, version, queryParams) {
  // Check if the `uri` is actually an url.
  if (new RegExp(/^http(s?):\/\//).test(uri)) {
    return uri;
  }

  uri = normalizeURI(uri);

  if (queryParams) {
    uri = `${uri}?${stringify(queryParams)}`;
  }

  return version ? `${baseUrl}/${version}/${uri}` : `${baseUrl}/${uri}`;
}
