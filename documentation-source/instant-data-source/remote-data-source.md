## Remote Data Sources

`ICSimpleDataSource` and its partner, `ICPaginatedDataSource` are designed for fetching remote objects and mappping them. Neither has a special initializer.

### `ICRemoteDataSource`

`ICRemoteDataSource` is the marriage of [`ICCollectionFetcher`]() and the `<ICDataSource>` protocol. `ICRemoteDataSource` is configured similarly to `ICCollectionFetcher`