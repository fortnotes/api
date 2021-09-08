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

- MySQL & MariaDB
- PostgreSQL
- SQLite


## Environment variables

 Name                    | Default | Description
-------------------------|---------|-------------
 FORTNOTES_LOG_LEVEL     | false   | verbosity level based on the [pino library](https://github.com/pinojs/pino/blob/master/docs/api.md) (levels: `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`)


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
