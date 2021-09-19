# FortNotes Server

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ffortnotes%2Fapi%2Fbadge%3Fref%3Dmain&style=flat-square)](https://actions-badge.atrox.dev/fortnotes/api/goto?ref=main)
[![Dependencies Status](https://img.shields.io/david/fortnotes/api.svg?style=flat-square)](https://david-dm.org/fortnotes/api)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/FortNotes)

[FortNotes](https://fortnotes.com/) is a highly secure online private information manager based on the AES encryption in the browser.


## Getting Started ##

[Node.js](http://nodejs.org/) and [NPM](https://www.npmjs.com/) should be installed beforehand.
Please follow the official [instruction](http://nodejs.org/download/).


## Usage ##

...


## DBMS Support

- SQLite
- PostgreSQL
- MySQL & MariaDB
- Microsoft SQL Server


## Environment variables

 Name                                    | Default          | Description
-----------------------------------------|------------------|-------------
 FORTNOTES_LOG_LEVEL                     | `false`          | verbosity level based on the [pino library](https://github.com/pinojs/pino/blob/master/docs/api.md) (levels: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`)
 FORTNOTES_HTTP_HOST                     | `0.0.0.0`        | interface to accept incoming connections
 FORTNOTES_HTTP_PORT                     | `4000`           | the port to accept incoming connections (if set to `0` a first available random port will be taken)
 FORTNOTES_HTTP_BODY_LIMIT               | 8 MiB            | defines the maximum payload (in bytes) the server is allowed to accept
 FORTNOTES_HTTP_TRUST_PROXY              | `false`          | if enabled the server will have knowledge that it's sitting behind a proxy and that the `X-Forwarded-*` header fields may be trusted, which otherwise may be easily spoofed
 FORTNOTES_GRAPHQL_PATH                  | `/graphql`       | the path for GraphQL server to listen on (main entry point)
 FORTNOTES_GRAPHQL_CORS                  | `false`          | cross-origin resource sharing activation
 FORTNOTES_GRAPHQL_HEALTH_CHECK          | `true`           | additional path `/.well-known/apollo/server-health` to determine if a server is available and ready to start serving traffic
 FORTNOTES_JWT_SECRET_SIZE               | `64`             | size (in bytes) used for random jwt secret generation
 FORTNOTES_JWT_SECRET                    | random string    | if not provided will be randomly generated
 FORTNOTES_JWT_ACCESS_TOKEN_EXPIRE_TIME  | 10 minutes       | access token lifetime (in seconds)
 FORTNOTES_JWT_REFRESH_TOKEN_EXPIRE_TIME | 30 days          | refresh token lifetime (in seconds)
 FORTNOTES_JWT_REFRESH_TOKEN_SIZE        | `96`             | refresh token size to randomly generate (in bytes)
 FORTNOTES_DB_DIALECT                    | `sqlite`         | the dialect of the database you are connecting to (supported: `mysql`, `sqlite`, `postgres`, `mssql`)
 FORTNOTES_DB_STORAGE                    | `./db.sqlite`    | db file name (only used by sqlite, can be `:memory:`)
 FORTNOTES_DB_DATABASE                   |                  | the name of the database
 FORTNOTES_DB_USERNAME                   |                  | the username which is used to authenticate against the database
 FORTNOTES_DB_PASSWORD                   |                  | the password which is used to authenticate against the database
 FORTNOTES_DB_HOST                       | `localhost`      | the host of the relational database
 FORTNOTES_DB_PORT                       | dialect specific | the port of the relational database
 FORTNOTES_DB_POOL_MIN                   | `0`              | minimum number of connection in pool
 FORTNOTES_DB_POOL_MAX                   | `5`              | maximum number of connection in pool
 FORTNOTES_DB_POOL_IDLE                  | `10000`          | the maximum time (in milliseconds) that a connection can be idle before being released


## Development ##

Get the latest version of source files:

```bash
git clone git@github.com:fortnotes/api.git
cd api
```

Then install local dependencies:

```bash
npm install
```

Now you can start it like this:

```bash
DEBUG=* npm run dev
```

Full API documentation is available in [local playground](http://localhost:???/).


## Testing ##

It's possible to run all tests locally:

```bash
npm test
```

### Environment variables

 Name                   | Description
------------------------|-------------
 FORTNOTES_API_ENDPOINT | GraphQL API endpoint to test

Tests are also run on [GitHub Actions](https://github.com/fortnotes/api/actions) for node versions `12.x`, `14.x` and `16.x`.


## License ##

`fortnotes` is released under the [AGPL-3.0 License](https://opensource.org/licenses/AGPL-3.0).
