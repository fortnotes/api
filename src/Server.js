import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import {ApolloServer} from 'apollo-server-fastify';
import DataLoader from 'dataloader';

import {typeDefs, resolvers} from './schema/index.js';


export default class Server {
    constructor ( config ) {
        // deep clone
        this.config = JSON.parse(JSON.stringify(config));
    }

    async start () {
        const {config} = this;

        const app = fastify({
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
            await app.authenticate(request, reply);

            return {
                app,
                db: app.db,
                request,
                reply,
                user: request.user,
                dataloaders: {
                    code: new DataLoader(ids => app.db.models.code.findAll({where: {id: ids}}))
                }
            };
        };

        const formatError = exception => {
            app.log.error(exception, 'GraphQL error');

            return exception;
        };

        if ( config.logLevel ) {
            app.addHook('preHandler', async request => {
                if ( request.body ) {
                    request.log.info({body: request.body}, 'parsed body');
                }
            });
        }

        const apolloServer = new ApolloServer({
            debug: !!config.logLevel,
            typeDefs,
            resolvers,
            context: prepareContext,
            formatError
        });

        app.decorate('config', config);

        await apolloServer.start();

        await app.register(fastifyCookie);
        await app.register(apolloServer.createHandler({
            path: config.graphql.path,
            cors: config.graphql.cors,
            // todo: improve check handler (include DB check)
            disableHealthCheck: !config.graphql.healthCheck
        }));
        await app.register(import('./plugins/errorHandler.js'));
        await app.register(import('./plugins/jwt.js'));
        await app.register(import('./plugins/sequelize.js'));

        await app.listen(config.httpPort, config.httpHost);

        // in case of 0 in config (port will be a first available random number)
        // return back this value to config
        config.httpPort = app.server.address().port;

        app.log.debug(config, 'config');

        this.app = app;
        this.apolloServer = apolloServer;
    }

    async stop () {
        await this.app.close();
        await this.apolloServer.stop();
    }
}
