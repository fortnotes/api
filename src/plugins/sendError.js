import fastifyPlugin from 'fastify-plugin';


export default fastifyPlugin(async app => {
    app.decorateReply('sendError', function sendError ( error, log ) {
        log && this.log.error(log);

        this.log.error(error);

        this.status(error.code).send(error.body);
    });
});
