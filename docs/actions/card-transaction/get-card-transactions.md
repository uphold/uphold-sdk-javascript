# `.getCardTransactions()`

Retrieves the list of transactions of a card.

| Argument       | Type   | Required | Description                                                        |
|:---------------|:-------|:---------|:-------------------------------------------------------------------|
| `cardId`       | String | Yes      | Card id                                                            |
| `page`         | Number | No       | Request page                                                       |
| `itemsPerPage` | Number | No       | Pagination size                                                    |
| `options`      | Object | No       | Any options you may want to pass to [`.paginate()`](/sdk#paginate) |

This method returns a **Promise** that resolves a [`Paginator`](/paginator) instance.

Get more details on the [official documentation](https://uphold.com/en/developer/api/documentation/#list-card-transactions).
