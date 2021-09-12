import crypto from 'crypto';


const {env} = process;

const envPrefix = 'FORTNOTES_';

const getEnv = ( name, defaultValue, cast = String ) => cast(env[`${envPrefix}${name}`]) || defaultValue;

const prepareVars = ( prefix, varNames ) => {
    const result = {};

    varNames.forEach(varName => {
        const varValue = env[`${envPrefix}${prefix.toUpperCase()}_${varName.toUpperCase()}`];

        if ( varValue !== undefined && varValue !== '' ) {
            result[varName] = varValue;
        }
    });

    return result;
};

const jwtSecretSize = getEnv('JWT_SECRET_SIZE', 64, Number);
const logLevel = getEnv('LOG_LEVEL', false);


export default {
    logLevel,

    // HTTP server options
    httpHost: getEnv('HTTP_HOST', '0.0.0.0'),
    httpPort: getEnv('HTTP_PORT', 4000, Number),

    jwt: {
        secretSize: jwtSecretSize,
        secret: getEnv(
            'JWT_SECRET',
            crypto.randomBytes(jwtSecretSize).toString('base64')
        ),
        accessTokenExpireTime: getEnv(
            'JWT_ACCESS_TOKEN_EXPIRE_TIME',
            10 * 60, // 10 minutes
            Number
        ),
        refreshTokenExpireTime: getEnv(
            'JWT_REFRESH_TOKEN_EXPIRE_TIME',
            30 * 24 * 60 * 60, // 30 days
            Number
        ),
        refreshTokenSize: getEnv('JWT_REFRESH_TOKEN_SIZE', 96, Number)
    },

    // https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html
    db: {
        dialect: getEnv('DB_DIALECT', 'sqlite'),
        storage: getEnv('DB_STORAGE', './db.sqlite'),
        ...(() => {
            if ( ['debug', 'trace'].includes(logLevel) ) {
                return {
                    logging: ( query, time ) => console.log(`${time}\t${query}`),
                    benchmark: true
                };
            }

            return {
                logging: false
            };
        })(),
        ...prepareVars('DB', [
            'database',
            'username',
            'password',
            'host',
            'port'
        ]),
        pool: prepareVars('DB_POOL', [
            'min',
            'max',
            'idle'
        ])
    }
};
