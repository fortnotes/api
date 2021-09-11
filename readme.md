# FortNotes Server

[![Build Status](https://img.shields.io/travis/fortnotes/api.svg?style=flat-square)](https://travis-ci.org/fortnotes/api)
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

???
Tests are also run on [Travis CI](https://travis-ci.org/fortnotes/server) for node versions `0.10.x`, `0.12.x` and `iojs`.


## License ##

`fortnotes` is released under the [AGPL-3.0 License](https://opensource.org/licenses/AGPL-3.0).
