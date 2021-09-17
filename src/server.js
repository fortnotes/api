import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import {ApolloServer} from 'apollo-server-fastify';
import DataLoader from 'dataloader';

import config from './config.js';
// import typeDefs from './schema.js';
// import resolvers from './resolvers.js';
import {typeDefs, resolvers} from './schema/index.js';

let app;
let apolloServer;

const start = async () => {
    app = fastify({
        // https://www.fastify.io/docs/latest/Server/#trustproxy
        trustProxy: config.httpTrustProxy,
        // https://www.fastify.io/docs/latest/Server/#logger
        logger: config.logLevel
            ? {
                base: null,
                prettyPrint: {
                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss'
                },
                level: config.logLevel,
                serializers: {
                    res ( reply ) {
                        return {
                            statusCode: reply.statusCode
                        };
                    },
                    req ( request ) {
                        return {
                            //method: request.method,
                            //url: request.url,
                            //path: request.path,
                            parameters: request.parameters,
                            cookie: request.headers.cookie
                        };
                    }
                }
            }
            : false,
        // https://www.fastify.io/docs/latest/Server/#bodylimit
        bodyLimit: config.httpBodyLimit
    });

    const prepareContext = async ( {request, reply} ) => {
        //console.log(reply.header);
        //console.log(cookie.parse(req.headers.cookie || ''));
        //reply.header('set-cookie', 'name1=value');
        //reply.header('set-cookie', 'name2=value');
        //const cookies = cookie.parse(req.headers.cookie || '');
        //console.log(request.cookies);

        // if ( cookies.accessToken ) {
        //     console.log(verifySync(cookies.accessToken));
        // }

        //console.log(request.headers);
        //console.log(request.cookies);
        await app.authenticate(request, reply);

        return {
            app,
            db: app.db,
            request,
            reply,
            user: request.user,
            //req,
            //res
            // cookies: cookie.parse(req.headers.cookie || ''),
            dataloaders: {
                code: new DataLoader(ids => app.db.models.code.findAll({where: {id: ids}}))
            }
        };
    };

    if ( config.logLevel ) {
        app.addHook('preHandler', async request => {
            if ( request.body ) {
                request.log.info({body: request.body}, 'parsed body');
            }
        });
    }

    apolloServer = new ApolloServer({
        debug: !!config.logLevel,
        typeDefs,
        resolvers,
        context: prepareContext
    });

    await apolloServer.start();

    await app.register(fastifyCookie);
    await app.register(apolloServer.createHandler({
        path: config.graphql.path,
        cors: config.graphql.cors,
        // todo: improve check handler (include DB check)
        disableHealthCheck: !config.graphql.healthCheck
    }));
    await app.register(import('./plugins/jwt.js'));
    await app.register(import('./plugins/sequelize.js'));

    //await sequelize.init();

    await app.listen(config.httpPort, config.httpHost);

    // in case of 0 in config (port will be a first available random number)
    // return back this value to config
    config.httpPort = app.server.address().port;

    app.log.debug(config, 'config');
};

const stop = async () => {
    await app.close();
    await apolloServer.stop();
};

export default {
    app,
    config,
    start,
    stop
};
