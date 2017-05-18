# `.getTicker()`

Retrieves the exchange rates for all supported currency pairs, or a particular one if `pair` is provided.

| Argument  | Type   | Required | Description                                              |
|:----------|:-------|:---------|:---------------------------------------------------------|
| `pair`    | String | No       | Currency pair                                            |
| `options` | Object | No       | Any options you may want to pass to [`.api()`](/sdk#api) |

This method returns a **Promise**.

Get more details on the [official documentation](https://uphold.com/en/developer/api/documentation/#tickers).
