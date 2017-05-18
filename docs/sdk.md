# SDK

This is the default class exported by this module, which when instantiated with your client id and secret offers an API to manage Uphold requests.

To see the full specification of the actions this class provides please jump to the [Actions](/actions) section.

Usage example:

```js
import SDK from '@uphold/uphold-sdk-javascript';

const sdk = new SDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar'
});

sdk.authorize('code')
  .then(() => sdk.getMe())
  .then(user => {
    console.log(user);
  });
```

## Properties

| Option                  | Description                                 |
|:------------------------|:--------------------------------------------|
| `options`               | SDK configuration                           |
| `client`                | [`Client`](/client) instance                |
| `storage`               | [`Storage`](/storage) instance              |
| `oauthClient`           | [`OAuthClient`](/oauthclient) instance      |
| `refreshRequestPromise` | Internal pointer to a refresh token request |
| `tokenRequestPromise`   | Internal pointer to an access token request |

## Constructor

| Argument  | Type   | Required | Description                 |
|:----------|:-------|:---------|:----------------------------|
| `options` | Object | Yes      | [`SDK`](/sdk) configuration |

The `options` argument accepts the following keys:

| Key               | Required | Default                  | Description                         |
|:------------------|:---------|:-------------------------|:------------------------------------|
| `accessTokenKey`  | No       | `uphold.access_token`    | Key used to store the access token  |
| `baseUrl`         | No       | `https://api.uphold.com` | Uphold API's url                    |
| `clientId`        | Yes      |                          | Your client id                      |
| `clientSecret`    | Yes      |                          | Your client secret                  |
| `itemsPerPage`    | No       | `10`                     | Pagination size                     |
| `refreshTokenKey` | No       | `uphold.refresh_token`   | Key used to store the refresh token |
| `version`         | No       | `v0`                     | Uphold API's version                |

## Methods

### `.api()`

This method handles Uphold API requests, and serves as basis for all actions.

It resolves the [`.request()`](/client#request) response `body` property by default.

| Argument  | Type   | Required | Description     |
|:----------|:-------|:---------|:----------------|
| `uri`     | String | Yes      | Endpoint URI    |
| `options` | Object | No       | Request options |

The `options` argument accepts the following keys:

| Key            | Type    | Default           | Description                                                   |
|:---------------|:--------|:------------------|:--------------------------------------------------------------|
| `authenticate` | Boolean | `true`            | Whether or not to build the `Authorization` header            |
| `body`         | Object  |                   | Request body                                                  |
| `headers`      | Object  |                   | Request headers                                               |
| `method`       | String  | `get`             | HTTP method                                                   |
| `queryParams`  | Object  |                   | Query parameters                                              |
| `raw`          | Boolean |                   | Resolve the whole [`.request()`](/client#request) response    |
| `version`      | String  | `options.version` | API version or use a falsy value for endpoints without prefix |

This method returns a **Promise**.

### `.authorize()`

Performs a request to `POST /oauth2/token` with given `code`, storing access and refresh tokens on success.

| Argument | Type   | Required | Description        |
|:---------|:-------|:---------|:-------------------|
| `code`   | String | Yes      | Authorization code |

This method returns a **Promise**.

### `.getToken()`

Resolves an object containing the stored tokens.

This method returns a **Promise**.

### `.logout()`

Performs a request to `POST /oauth2/revoke`, removing tokens from storage on success.

This method returns a **Promise**.

### `.paginate()`

Performs a paginated request.

| Argument       | Type   | Required | Default                | Description                                                                             |
|:---------------|:-------|:---------|:-----------------------|:----------------------------------------------------------------------------------------|
| `url`          | String | Yes      |                        | Full endpoint URL                                                                       |
| `page`         | Number | No       | `1`                    | Requested page                                                                          |
| `itemsPerPage` | Number | No       | `options.itemsPerPage` | Pagination size                                                                         |
| `options`      | Object | No       |                        | Any options you may want to pass to the [Paginator constructor](/paginator#constructor) |

This method returns a **Promise** that resolves a [`Paginator`](/paginator) instance.

### `.removeToken()`

Removes tokens from storage.

This method returns a **Promise**.

### `.setToken()`

Sets tokens in storage.

| Argument | Type   | Required | Description                                                      |
|:---------|:-------|:---------|:-----------------------------------------------------------------|
| `token`  | Object | Yes      | An object containing the `access_token` and `refresh_token` keys |

This method returns a **Promise**.
