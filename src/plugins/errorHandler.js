//import Sequelize from 'sequelize';
import fastifyPlugin from 'fastify-plugin';

//import errors from '../constants/errors.js';

//const Exceptions = require('../exceptions');


// ???
export default fastifyPlugin(async app => {
    app.setErrorHandler(async ( exception/* , request, reply */ ) => {
        //let error;

        app.log.error(exception, 'fastify error');

        /* switch ( exception.constructor ) {
            case Sequelize.ValidationError:
                error = errors.INVALID_REQUEST_DATA;
                break;

            case Sequelize.UniqueConstraintError:
                error = errors.DUPLICATE_ENTRY;
                error.body.message = exception.errors[0].message;
                break;

            case Sequelize.AccessDeniedError:
            case Sequelize.AssociationError:
            case Sequelize.UnknownConstraintError:
                error = errors.ACCESS_DENIED;
                break;

            case Sequelize.InstanceError:
            case Sequelize.TimeoutError:
            case Sequelize.DatabaseError:
            case Sequelize.ConnectionError:
            case Sequelize.QueryError:
            case Sequelize.OptimisticLockError:
            case Sequelize.ConnectionAcquireTimeoutError:
            case Sequelize.ConnectionRefusedError:
            case Sequelize.ConnectionTimedOutError:
            case Sequelize.EagerLoadingError:
                error = errors.INTERNAL_SERVER_ERROR;
                break;

            default:
                if ( exception.message ) {
                    error = {...errors.BAD_REQUEST};
                    error.body.message = exception.message;
                } else {
                    error = errors.BAD_REQUEST;
                }

                break;
        } /**/

        //reply.sendError(error);
    });
});
