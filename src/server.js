import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import {ApolloServer} from 'apollo-server-fastify';
import DataLoader from 'dataloader';

import config from './config.js';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

let app;
let apolloServer;

const start = async () => {
    app = fastify({
        trustProxy: true,
        logger: config.logLevel
            ? {
                base: null,
                prettyPrint: {
                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss'
                },
                level: config.logLevel
            }
            : false
    });

    app.log.debug(config, 'config');

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

    apolloServer = new ApolloServer({
        debug: !!config.logLevel,
        typeDefs,
        resolvers,
        context: prepareContext
    });

    //(async function start () {
    await apolloServer.start();

    await app.register(fastifyCookie);
    await app.register(apolloServer.createHandler());
    await app.register(import('./plugins/jwt.js'));
    await app.register(import('./plugins/sequelize.js'));

    //await sequelize.init();

    app.listen(config.httpPort, config.httpHost);
    //}());
};

const stop = async () => {
    await app.close();
    await apolloServer.stop();
};

export default {
    config,
    start,
    stop
};
