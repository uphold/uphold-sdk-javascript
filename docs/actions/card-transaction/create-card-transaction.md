# `.createCardTransaction()`

Creates a transaction, which can afterwards be commited by calling the [`.commitCardTransaction()`](/actions/card-transaction/commit-card-transaction) action.

The `otp` argument will add the `OTP-TOKEN` header to the request.

The `commit` argument will add the `commit` query parameter.

| Argument  | Type    | Required | Description                                              |
|:----------|:--------|:---------|:---------------------------------------------------------|
| `cardId`  | String  | Yes      | Card id                                                  |
| `body`    | Object  | No       | Request body                                             |
| `commit`  | Boolean | No       | Commit the transaction                                   |
| `otp`     | String  | No       | OTP token                                                |
| `options` | Object  | No       | Any options you may want to pass to [`.api()`](/sdk#api) |

The `body` argument accepts the following keys:

| Key            | Type   | Description                                                  |
|:---------------|:-------|:-------------------------------------------------------------|
| `amount`       | String | The value amount to send in the denominated currency         |
| `currency`     | String | The currency by which you wish to denominate the transaction |
| `message`      | String | Transaction details                                          |
| `securityCode` | String | Credit card security code                                    |

This method returns a **Promise**.

Get more details on the [official documentation](https://uphold.com/en/developer/api/documentation/#create-amp-commit-a-transaction).
