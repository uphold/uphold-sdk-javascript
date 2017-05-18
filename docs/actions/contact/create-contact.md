# `.createContact()`

Creates a contact.

| Argument  | Type   | Required | Description                                              |
|:----------|:-------|:---------|:---------------------------------------------------------|
| `body`    | Object | Yes      | Request body                                             |
| `options` | Object | No       | Any options you may want to pass to [`.api()`](/sdk#api) |

The `body` argument accepts the following keys:

| Key         | Type   | Description                       |
|:------------|:-------|:----------------------------------|
| `addresses` | Array  | A list of bitcoin addresses       |
| `company`   | String | The company of affiliation        |
| `emails`    | Array  | A list of contact email addresses |
| `firstName` | String | Contact's first name              |
| `lastName`  | String | Contact's last name               |

This method returns a **Promise**.

Get more details on the [official documentation](https://uphold.com/en/developer/api/documentation/#create-contact).
