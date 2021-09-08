import crypto from 'crypto';


const {env} = process;

const jwtSecretSize = Number(env.FORTNOTES_JWT_SECRET_SIZE) || 64;


export default {
    logLevel: env.FORTNOTES_LOG_LEVEL || false,

    // HTTP server options
    httpHost: env.FORTNOTES_HTTP_HOST || '0.0.0.0',
    httpPort: env.FORTNOTES_HTTP_PORT || 4000,

    jwtSecret: env.FORTNOTES_JWT_SECRET
        || crypto.randomBytes(jwtSecretSize).toString('base64'),
    jwtSecretSize,
    jwtAccessTokenExpireTime: Number(env.FORTNOTES_JWT_ACCESS_TOKEN_EXPIRE_TIME)
        || 10 * 60,
    jwtRefreshTokenExpireTime: Number(env.FORTNOTES_JWT_REFRESH_TOKEN_EXPIRE_TIME)
        || 30 * 24 * 60 * 60,
    jwtRefreshTokenSize: Number(env.FORTNOTES_JWT_REFRESH_TOKEN_SIZE)
        || 96
};
