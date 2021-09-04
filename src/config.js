import crypto from 'crypto';


const {env} = process;

//var path = require('path');


export default {
    // enable verbose debug mode
    //debug: false,
    logLevel: env.FORTNOTES_LOG_LEVEL || 'info',

    // run tests and exit
    //test: false,

    // HTTP server options
    httpHost: env.FORTNOTES_HTTP_HOST || '0.0.0.0',
    httpPort: env.FORTNOTES_HTTP_PORT || 4000,

    jwtSecret: env.FORTNOTES_JWT_SECRET
        || crypto.randomBytes(64).toString(),
    jwtAccessTokenExpireTime: Number(env.FORTNOTES_JWT_ACCESS_TOKEN_EXPIRE_TIME)
        || 10 * 60,
    jwtRefreshTokenExpireTime: Number(env.FORTNOTES_JWT_REFRESH_TOKEN_EXPIRE_TIME)
        || 30 * 24 * 60 * 60,
    jwtRefreshTokenSize: Number(env.FORTNOTES_JWT_REFRESH_TOKEN_SIZE)
        || 96,


    // maximum encrypted data size (notes, tags, etc.)
    // 1Mb
    dataSize: 1048576,

    // notes/tags sha512 hash size
    hashSize: 128,

    // default amount of returned records in lists of notes, sessions, etc.
    dataLimit: 20,

    // maximum amount of returned records in lists
    dataLimitMax: 200,

    // generated token size in bytes
    sessionTokenSize: 96,

    // generated token confirmation code size in bytes
    sessionConfirmCodeSize: 12,

    // allowed amount of attempts to activate sessions
    sessionConfirmAttempts: 3,

    // nodemailer SMTP transport configuration (use direct if not set)
    // https://github.com/andris9/nodemailer-smtp-transport
    smtpTransport: null,

    // nodemailer e-mail message fields
    // https://github.com/andris9/Nodemailer#e-mail-message-fields
    mailOptions: {
        from: 'admin@fortnotes.com',
        subject: 'FortNotes Server notification'
    }

    // database connection options passed to node-orm2 package
    // https://github.com/dresende/node-orm2/wiki/Connecting-to-Database
    /* database: {
        protocol: 'sqlite',
        pathname: path.join(__dirname, 'data.sqlite')
    } */
};
