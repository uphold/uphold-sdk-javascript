<p align="center">
  <a href="https://github.com/uphold/uphold-sdk-javascript">
    <img src="docs/images/favicon.ico"/>
  </a>
</p>

<h1 align="center">Uphold SDK for JavaScript</h1>

<p align="center">
  <a href="https://travis-ci.org/uphold/uphold-sdk-javascript">
    <img src="https://img.shields.io/travis/uphold/uphold-sdk-javascript/master.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@uphold/uphold-sdk-javascript">
    <img src="https://img.shields.io/npm/v/@uphold/uphold-sdk-javascript.svg?style=flat-square"/>
  </a>
  <img src="https://img.shields.io/badge/node-%3E=4-brightgreen.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square"/>
  <a href="https://github.com/uphold/uphold-sdk-javascript/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@uphold/uphold-sdk-javascript.svg?style=flat-square"/>
  </a>
</p>

This SDK is built on top of the [Uphold API](https://uphold.com/en/developer/api) and it's designed to help developers integrate Uphold services into their applications, by making it easier for them to interact with the API in a clean and controlled manner.

It provides developers the facilities to handle authentication, requests, pagination and error handling.

## Documentation

Please consult the [documentation website](https://uphold.github.io/uphold-sdk-javascript) for a more detailed specification of the SDK and its modules:

- [SDK](https://uphold.github.io/uphold-sdk-javascript/sdk.html)
- [Client](https://uphold.github.io/uphold-sdk-javascript/client.html)
- [Storage](https://uphold.github.io/uphold-sdk-javascript/storage.html)
- [Paginator](https://uphold.github.io/uphold-sdk-javascript/paginator.html)
- [OAuthClient](https://uphold.github.io/uphold-sdk-javascript/oauthclient.html)
- [Errors](https://uphold.github.io/uphold-sdk-javascript/errors.html)
- [Actions](https://uphold.github.io/uphold-sdk-javascript/actions.html)

## Supported platforms

This SDK can be used on both **browser** and **Node.js** environments.

There are no major dependencies other than the fact that it uses the [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) to perform network requests, which [some browsers do not yet support](http://caniuse.com/#feat=fetch).

However, you can easily cover your bases by adding a [polyfill](https://github.com/github/fetch). If this is a solution you are not comfortable with then please consult the [Client](https://uphold.github.io/uphold-sdk-javascript/client.html) documentation and follow the instructions on how to override it.

## Usage

In this section we feature a simple usage example:

```js
import SDK from '@uphold/uphold-sdk-javascript';

const sdk = new SDK({
  clientId: 'foo',
  clientSecret: 'bar'
});

sdk.authorize('code')
  .then(() => sdk.getMe())
  .then(user => {
    console.log(user);
  });
```

### Options

Below you can consult the list of available options you can pass to the SDK [constructor](https://uphold.github.io/uphold-sdk-javascript/sdk.html#constructor):

| Key               | Required | Default                  | Description                           |
|:------------------|:---------|:-------------------------|:--------------------------------------|
| `accessTokenKey`  | No       | `uphold.access_token`    | Key used to store the `access_token`  |
| `baseUrl`         | No       | `https://api.uphold.com` | Uphold API's url                      |
| `clientId`        | Yes      |                          | Your client id                        |
| `clientSecret`    | Yes      |                          | Your client secret                    |
| `itemsPerPage`    | No       | `10`                     | Pagination size                       |
| `refreshTokenKey` | No       | `uphold.refresh_token`   | Key used to store the `refresh_token` |
| `version`         | No       | `v0`                     | Uphold API's version                  |

## Installation

To install the SDK just type into your terminal:

```sh
$ npm install @uphold/uphold-sdk-javascript
```

Or, if you're using `yarn`:

```sh
$ yarn add @uphold/uphold-sdk-javascript
```

## Feedback, bugs & contributions

**Contributions** are welcome, consult the [guidelines for contributing](/.github/CONTRIBUTING.md) for instructions.

## License

[MIT](/LICENSE)
