# Contributing

Contributions are welcome and if you wish to make one you can just [fork](https://github.com/uphold/uphold-sdk-javascript#fork-destination-box) this repository, create a branch and submit a [Pull request](https://github.com/uphold/uphold-sdk-javascript/pulls).

If you want to provide some feedback please reach out to us at: <support@uphold.com>.

To report bugs or suggest new features, feel free to open an [Issue](https://github.com/uphold/uphold-sdk-javascript/issues), just so long as you adhere to the ordained format, that is displayed to you.

When submitting a [Pull request](https://github.com/uphold/uphold-sdk-javascript/pulls), make sure to add tests that ensure your feature's completeness or bug resolution, and ensure that the [Travis](https://travis-ci.org/uphold/uphold-sdk-javascript) build passes.

Our selected testing framework is [Jest](https://facebook.github.io/jest) and to execute the test suite just run the following command:

```sh
$ yarn test
```

You can also check the code coverage by running the following command:

```sh
$ yarn cover
```

This will output a summary of coverage data to the terminal and it will generate a more detailed coverage report that you can browse through, inside the `coverage` folder.

There's also a TDD script if you wish to run your code against the tests while developing. To do so, just run the following command:

```sh
$ yarn tdd
```
