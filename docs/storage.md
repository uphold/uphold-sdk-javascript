# Storage

This class is responsible for storing internal data such as a user's access and refresh tokens, being the browser version based on cookies and the Node.js version based on plain memory caching.

Following the previous approach, the `Storage` behavior can be overridden as well.

If you're using the SDK in a mobile environment the default implementation wouldn't work since it expects cookies support.

Check the example for a [React Native](https://facebook.github.io/react-native) compatible implementation with [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage).

How to override `Storage` with [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage):

```js
import { AsyncStorage } from 'react-native';
import SDK from '@uphold/uphold-sdk-javascript';

export default class extends SDK {
  constructor() {
    super(...arguments);

    this.storage = AsyncStorage;
  }
}
```

## Properties

| Property      | Type   | Description                        |
|:--------------|:-------|:-----------------------------------|
| `cache`       | Object | Object to store cached data        |
| `storageName` | String | Prefix used to store cookie values |

`Storage` default properties:

```json
{
  "cache": {},
  "storageName": "_token"
}
```

## Constructor

| Argument      | Type   | Required | Default value | Description   |
|:--------------|:-------|:---------|:--------------|:--------------|
| `storageName` | String | No       | `_token`      | Cookie prefix |

## Methods

### `.getItem()`

Retrieves items from storage, resolving the stored value or rejecting otherwise.

| Argument | Type   | Required | Description |
|:---------|:-------|:---------|:------------|
| `key`    | String | Yes      | Item key    |

This method returns a **Promise**.

### `.setItem()`

Sets an item in storage resolving the stored value.

| Argument | Type   | Required | Description |
|:---------|:-------|:---------|:------------|
| `key`    | String | Yes      | Item key    |
| `value`  | String | Yes      | Item value  |

This method returns a **Promise**.

### `.removeItem()`

Removes an item from storage resolving the removed value.

| Argument | Type   | Required | Description |
|:---------|:-------|:---------|:------------|
| `key`    | String | Yes      | Item key    |

This method returns a **Promise**.
