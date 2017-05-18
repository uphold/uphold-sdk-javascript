# `.getReserveLedger()`

Returns a detailed record of the obligations/liabilities flowing into our network and the resulting changes to the assets.

| Argument       | Type   | Required | Description                                                        |
|:---------------|:-------|:---------|:-------------------------------------------------------------------|
| `page`         | Number | No       | Request page                                                       |
| `itemsPerPage` | Number | No       | Pagination size                                                    |
| `options`      | Object | No       | Any options you may want to pass to [`.paginate()`](/sdk#paginate) |

This method returns a **Promise** that resolves a [`Paginator`](/paginator) instance.

Get more details on the [official documentation](https://uphold.com/en/developer/api/documentation/#the-reserveledger).
