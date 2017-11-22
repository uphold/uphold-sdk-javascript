# Errors

For a general view of the errors returned by the API consult the [official documentation](https://uphold.com/en/developer/api/documentation/#errors).

All errors returned by the API are handled by the SDK and for each there is an appropriate error class.

Every error class extends the `BaseError` class which is based on [StandardError](https://www.npmjs.com/package/standard-error).

Example of an error thrown by the SDK:

```js
NotFoundError: not_found {
  status: 404,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    message: 'Not found',
    code: 'not_found'
  }
}
```

## `ForbiddenError`

When a request returns with an HTTP status code of `403`.

## `InternalServerError`

When a request returns with an HTTP status code of `500`.

## `InvalidScopeError`

When a request returns with an HTTP status code of `400` and the response's body contains an error value of `invalid_scope`.

## `LoginRequiredError`

Returned when a request that requires authentication is performed without the proper credentials.

## `NotFoundError`

When a request returns with an HTTP status code of `404`.

## `OTPRequiredError`

Returned for a request whose response contains an `OTP-TOKEN` header value of `REQUIRED`.         

## `RateLimitError`

When a request returns with an HTTP status code of `429`.                                         

## `UnauthorizedError`

When a request returns with an HTTP status code of `400` and the response's body contains an error value of `invalid_request` or `invalid_grant`.

When a request returns with an HTTP status code of `401` and the response's body contains an error value of `invalid_token`.

## `UnavailableError`

When a request returns with an HTTP status code equal to or lower than 0 (browser only).          

## `UnknownError`

Returned as a fallback when the error is not any of the other ones herein described.

## `ValidationFailedError`

Returned for a request whose `body` contains a `validation_failed` code.
