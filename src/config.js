import crypto from 'crypto';


const {env} = process;

const envPrefix = 'FORTNOTES_';

const getEnv = ( name, defaultValue, cast = String ) => {
    const variable = env[`${envPrefix}${name}`];

    return variable ? cast(variable) : defaultValue;
};

// convert string to boolean
const booleanHandler = value => {
    const lcValue = value.toLowerCase();

    if ( !['true', 'false'].includes(lcValue) ) {
        throw new Error(
            `Boolean environment variables should have one of these values: "true" or "false", but got "${lcValue}"`
        );
    }

    return lcValue === 'true';
};

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

    // https://www.fastify.io/docs/latest/Server/
    httpHost: getEnv('HTTP_HOST', '0.0.0.0'),
    httpPort: getEnv('HTTP_PORT', 4000, Number),
    httpBodyLimit: getEnv('HTTP_BODY_LIMIT', 8 * 1024 * 1024, Number), // 8 MiB
    httpTrustProxy: getEnv('HTTP_TRUST_PROXY', false, booleanHandler),

    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/#options-1
    graphql: {
        path: getEnv('GRAPHQL_PATH', '/graphql'),
        cors: getEnv('GRAPHQL_CORS', false, booleanHandler),
        healthCheck: getEnv('GRAPHQL_HEALTH_CHECK', true, booleanHandler)
    },

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
