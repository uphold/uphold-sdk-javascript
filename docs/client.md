# Client

This class is responsible for performing HTTP requests to Uphold's API, being the browser version based on the [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) and the Node.js version based on [request-promise](https://github.com/request/request-promise).

If you wish to extend the request handler with added functionality or if you don't like the idea of using a [polyfill](https://github.com/github/fetch), you can simply override the `client` property and roll your own XHR client implementation.

Pseudo-implementation of an alternative client:

```js
import SDK, { Client } from '@uphold/uphold-sdk-javascript';

class AlternativeClient extends Client {
  request(url, method, body, customHeaders = {}, options) {
    // Make your own implementation, but make sure it returns a Promise that resolves
    // or rejects an object with the schema demonstrated at the bottom of this section.
  }
}

export default class extends SDK {
  constructor() {
    super(...arguments);

    this.client = new AlternativeClient();
  }
}
```

## Properties

| Property         | Type   | Description                                      |
|:-----------------|:-------|:-------------------------------------------------|
| `defaultHeaders` | Object | Default headers sent to every Uphold API request |

`Client` default properties:

```json
{
  "defaultHeaders": {
    "user-agent": "uphold-sdk-javascript/<version>"
  }
}
```

## Methods

### `.request()`

This method is responsible for performing HTTP requests to Uphold's API.

| Argument  | Type   | Required | Description       |
|:----------|:-------|:---------|:------------------|
| `url`     | String | Yes      | Full endpoint URL |
| `method`  | String | Yes      | HTTP method       |
| `body`    | Object | Yes      | Request body      |
| `headers` | Object | No       | Request headers   |
| `options` | Object | No       | Request options   |

This method must resolve an object with the following schema so that pagination and errors can be handled in a proper fashion:

```json
{
  "body": {
    "code": "unauthorized",
    "message": "Unauthorized"
  },
  "headers": {
    "otp-token": "required"
  },
  "status": 401
}
```

This method returns a **Promise**.
