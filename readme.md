# FortNotes Server

[![Build Status](https://img.shields.io/travis/fortnotes/api.svg?style=flat-square)](https://travis-ci.org/fortnotes/api)
[![NPM version](https://img.shields.io/npm/v/fortnotes.svg?style=flat-square)](https://www.npmjs.com/package/fortnotes)
[![Dependencies Status](https://img.shields.io/david/fortnotes/api.svg?style=flat-square)](https://david-dm.org/fortnotes/api)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/FortNotes)

[FortNotes](https://fortnotes.com/) is a highly secure online private information manager based on the AES encryption in the browser.


## Getting Started ##

[Node.js](http://nodejs.org/) and [NPM](https://www.npmjs.com/) should be installed beforehand.
Please follow the official [instruction](http://nodejs.org/download/).


## Usage ##

...


#### DBMS Support

- MySQL & MariaDB
- PostgreSQL
- SQLite


#### Config file options

 Name                    | Description
-------------------------|-------------
 debug                   | enable verbose debug mode
 test                    | run tests and exit
 port                    | HTTP port serving REST API requests
 dataSize                | maximum encrypted data size (notes, tags)
 hashSize                | notes/tags sha512 hash size
 dataLimit               | default amount of returned records in lists of notes, sessions etc.
 dataLimitMax            | maximum amount of returned records in lists
 sessionTokenSize        | generated token size in bytes
 sessionConfirmCodeSize  | generated token confirmation code size in bytes
 sessionConfirmAttempts  | allowed amount of attempts to activate sessions
 smtpTransport           | nodemailer SMTP transport [configuration](https://github.com/andris9/nodemailer-smtp-transport) (use direct if not set)
 mailOptions             | nodemailer e-mail message [fields](https://github.com/andris9/Nodemailer#e-mail-message-fields)
 restify                 | server creation options passed to [restify package](http://mcavage.me/node-restify/#creating-a-server)
 database                | database connection options passed to [node-orm2 package](https://github.com/dresende/node-orm2/wiki/Connecting-to-Database)



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

???
Tests are also run on [Travis CI](https://travis-ci.org/fortnotes/server) for node versions `0.10.x`, `0.12.x` and `iojs`.


## License ##

`fortnotes` is released under the [AGPL-3.0 License](https://opensource.org/licenses/AGPL-3.0).
