# `.commitCardTransaction()`

Commits a pending transaction.

The `otp` argument will add the `OTP-TOKEN` header to the request.

| Argument        | Type   | Required | Description                                              |
|:----------------|:-------|:---------|:---------------------------------------------------------|
| `cardId`        | String | Yes      | Card id                                                  |
| `transactionId` | String | Yes      | Transaction id                                           |
| `body`          | Object | No       | Request body                                             |
| `otp`           | String | No       | OTP token                                                |
| `options`       | Object | No       | Any options you may want to pass to [`.api()`](/sdk#api) |

The `body` argument accepts the following keys:

| Key            | Type   | Description               |
|:---------------|:-------|:--------------------------|
| `message`      | String | Transaction details       |
| `securityCode` | String | Credit card security code |

This method returns a **Promise**.

Get more details on the [official documentation](https://uphold.com/en/developer/api/documentation/#create-amp-commit-a-transaction).
