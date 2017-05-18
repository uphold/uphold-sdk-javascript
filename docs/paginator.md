# Paginator

An instance of this class is returned in every action that requests an endpoint that implements [pagination](https://uphold.com/en/developer/api/documentation/#pagination), simplifying the construction and parsing of `Range` and `Content-Range` headers.

## Properties

| Property       | Type   | Description                                       |
|:---------------|:-------|:--------------------------------------------------|
| `currentPage`  | Number | The current page, considering the pagination size |
| `headers`      | Object | Headers of the current page response              |
| `items`        | Array  | Current page items                                |
| `itemsCount`   | Number | Current page items count                          |
| `itemsPerPage` | Number | Pagination size                                   |
| `options`      | Object | Options passed to [`.api()`](/sdk#api) method     |
| `pagesCount`   | Number | Number of pages                                   |
| `sdk`          | SDK    | [`SDK`](/sdk) instance                            |
| `uri`          | String | Resource URI                                      |

**NOTE:** The `options` property will be passed in any [`.getPage()`](#getpage), [`.getNextPage()`](#getnextpage) and [`.getPreviousPage()`](#getpreviouspage) methods to the underlying [`.api()`](/sdk#api) call behind the hood, although you can override it in each of these methods or any other [action](/actions) that resolves a `Paginator` instance.

## Constructor

| Argument       | Type   | Required | Description                                       |
|:---------------|:-------|:---------|:--------------------------------------------------|
| `sdk`          | SDK    | Yes      | [`SDK`](/sdk) instance                            |
| `uri`          | String | Yes      | Resource URI                                      |
| `itemsPerPage` | Number | Yes      | Pagination size                                   |
| `options`      | Object | No       | Options passed to the [`.api()`](/sdk#api) method |

## Methods

### `.getNextPage()`

Resolves a `Paginator` instance for the next page or `undefined` if non-existent.

| Argument  | Type   | Required | Description                                              |
|:----------|:-------|:---------|:---------------------------------------------------------|
| `options` | Object | No       | Any options you may want to pass to [`.api()`](/sdk#api) |

This method returns a **Promise**.

### `.getPreviousPage()`

Resolves a `Paginator` instance for the previous page or `undefined` if non-existent.

| Argument  | Type   | Required | Description                                              |
|:----------|:-------|:---------|:---------------------------------------------------------|
| `options` | Object | No       | Any options you may want to pass to [`.api()`](/sdk#api) |

This method returns a **Promise**.

### `.hasNextPage()`

Determines whether or not there is a next page.

### `.hasPreviousPage()`

Determines whether or not there is a previous page.

### `.getPage()`

Resolves a `Paginator` instance for a specific page or `undefined` if non-existent.

| Argument  | Type   | Required | Default | Description                                              |
|:----------|:-------|:---------|:--------|:---------------------------------------------------------|
| `page`    | Number | No       | `1`     | Page number to request |                                 |
| `options` | Object | No       |         | Any options you may want to pass to [`.api()`](/sdk#api) |

This method returns a **Promise**.
