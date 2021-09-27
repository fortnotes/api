import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';


export default fastifyPlugin(async app => {
    const {config} = app;

    const cookiePath = config.graphql.path;

    const setAccessToken = ( reply, user ) => {
        const token = app.jwt.sign(user, {
            expiresIn: config.jwt.accessTokenExpireTime,
            algorithm: 'HS512'
        });

        reply.setCookie('accessToken', token, {
            path: cookiePath,
            httpOnly: true,
            sameSite: true,
            maxAge: config.jwt.accessTokenExpireTime
        });
    };

    const setRefreshToken = ( reply, token ) => {
        reply.setCookie('refreshToken', token, {
            path: cookiePath,
            httpOnly: true,
            sameSite: true,
            maxAge: config.jwt.refreshTokenExpireTime
        });
    };

    const getDetails = request => ({
        ip: request.ips.join(),
        userAgent: request.headers['user-agent']
    });

    app.register(fastifyJwt, {
        secret: config.jwt.secret,
        cookie: {
            cookieName: 'accessToken'
        }
    });

    app.decorate('authenticate', async ( request, reply ) => {
        try {
            // fill request.user
            const user = await request.jwtVerify();

            // jwt.sign will fail with exp field
            delete user.exp;
            delete user.iat;

            // sliding expiration
            setAccessToken(reply, user);
        } catch ( error ) {
            if ( request.cookies.refreshToken ) {
                const refreshToken = await app.db.models.refreshToken.verify(
                    request.cookies.refreshToken
                );

                if ( refreshToken ) {
                    // new random data and expireAt
                    await refreshToken.refresh(getDetails(request));

                    const user = await app.db.models.user.findByPk(refreshToken.userId);
                    const tokenString = refreshToken.toString();

                    request.user = user.getJwtData();
                    // actualize for clearUser on logout
                    request.cookies.refreshToken = tokenString;

                    setAccessToken(reply, request.user);
                    setRefreshToken(reply, tokenString);

                    //return;
                }
            }

            //reply.sendError(errors.AUTHORIZATION_REQUIRED, error);
        }
    });

    app.decorate('setUser', async ( request, reply, user ) => {
        const jwtData = user.getJwtData();
        const refreshToken = await app.db.models.refreshToken.generate({
            userId: user.id,
            ...getDetails(request)
        });

        setAccessToken(reply, jwtData);
        setRefreshToken(reply, refreshToken.toString());

        //reply.send(jwtData);
    });

    app.decorate('clearUser', async ( request, reply ) => {
        // protection from user with valid accessToken
        // to be able to terminate refreshToken for another user
        const refreshToken = await app.db.models.refreshToken.verify(
            request.cookies.refreshToken
        );

        refreshToken && refreshToken.destroy();
        request.user = null;

        reply.clearCookie('accessToken', {path: cookiePath});
        reply.clearCookie('refreshToken', {path: cookiePath});

        reply.code(204);
    });
});
