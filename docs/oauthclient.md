# OAuthClient

This class serves as a helper to build request objects for authorization related endpoints.

How to extend the `OAuthClient`:

```js
import SDK, { OAuthClient } from '@uphold/uphold-sdk-javascript';

class AlternativeOAuthClient extends OAuthClient {
  myCustomMethod() {
    // Implement your custom method logic.
  }
}

export default class extends SDK {
  constructor(options) {
    super(options);

    // Make sure to pass the SDK options in your OAuthClient constructor.
    this.oauthClient = new AlternativeOAuthClient(options);
  }
}
```

## Properties

| Property       | Type   | Description              |
|:---------------|:-------|:-------------------------|
| `clientId`     | String | Client id                |
| `clientSecret` | String | Client secret            |
| `headers`      | Object | Request headers          |
| `requestUrl`   | String | Access token request url |
| `revokeUrl`    | String | Revoke token request url |

`OAuthClient` default properties:

```json
{
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "requestUrl": "https://api.uphold.com/oauth2/token",
  "revokeUrl": "https://api.uphold.com/oauth2/revoke"
}
```

## Constructor

| Option         | Required | Description        |
|:---------------|:---------|:-------------------|
| `baseUrl`      | Yes      | Uphold API's url   |
| `clientId`     | Yes      | Your client id     |
| `clientSecret` | Yes      | Your client secret |

## Methods

### `.buildAccessTokenRequestByAuthorizationCodeGrant()`

Builds an access token request with the `authorization_code` grant type.

| Argument | Type   | Required | Description        |
|:---------|:-------|:---------|:-------------------|
| `code`   | String | Yes      | Authorization code |

### `.buildRefreshTokenRequest()`

Builds an access token request with the `refresh_token` grant type.

| Argument | Type   | Required | Description   |
|:---------|:-------|:---------|:--------------|
| `token`  | String | Yes      | Refresh token |

### `.buildRevokeTokenRequest()`

Builds a revoke token request.

| Argument | Type   | Required | Description  |
|:---------|:-------|:---------|:-------------|
| `token`  | String | Yes      | Access token |
