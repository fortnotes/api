/* eslint-disable max-classes-per-file */
import cookie from 'cookie';

import config from './config.js';

const authUser = ( parent, args, context, handler ) => {
    if ( context.user ) {
        throw new Error('User is not authorized.');
    }

    return handler(parent, args, context);
};

export class GeneralError extends Error {
    constructor ( message ) {
        super(message);
        this.name = this.constructor.name;
    }
}

class AuthRequiredError extends GeneralError {
    constructor () {
        super('You must be logged in to execute this request.');
    }
}

class AuthWrongCredentialsError extends GeneralError {
    constructor () {
        super('Wrong user credentials.');
    }
}

const cookiePath = '/api/';

const getDetails = request => ({
    ip: request.ip,
    userAgent: request.headers['user-agent']
});

const setAccessToken = ( response, user ) => {
    const token = app.jwt.sign(user, {
        expiresIn: config.jwt.accessTokenExpireTime,
        algorithm: 'HS512'
    });

    response.setCookie('accessToken', token, {
        path: cookiePath,
        httpOnly: true,
        sameSite: true,
        maxAge: config.jwt.accessTokenExpireTime
    });
};

const setRefreshToken = ( response, token ) => {
    response.header(
        'Set-Cookie',
        cookie.serialize('refreshToken', token, {
            path: cookiePath,
            httpOnly: true,
            sameSite: true,
            maxAge: config.jwt.refreshTokenExpireTime
        })
    );
};

export default {
    Query: {
        code ( parent, {id}, {db} ) {
            return db.models.code.findByPk(id);
        },

        codes ( parent, args, {db} ) {
            return db.models.code.findAll();
        },

        note ( parent, {id}, {db} ) {
            return db.models.note.findByPk(id);
        },

        notes: ( parent, args, {db, user} ) => {
            //console.log(user);

            if ( !user ) {
                throw new AuthRequiredError();
            }

            return db.models.note.findAll();
        }
    },


    Note: {
        code ( note, args, {dataloaders} ) {
            return dataloaders.code.load(note.codeId);
        }
    },

    User: {
        aesKey ( user ) {
            return user.getAesKey();
        }
    },

    AesKey: {
        code ( aesKey ) {
            return aesKey.getCode();
        }
    },


    Mutation: {
        async login ( parent, {email, password}, {app, db, request, reply} ) {
            const user = await db.models.user.findOne({where: {email, password}});

            if ( user ) {
                /* const jwtData = user.getJwtData();
                const refreshToken = await db.models.refreshToken.generate({
                    userId: user.id,
                    ...getDetails(req)
                }); */
                //console.log(user);
                //console.log(jwtData);
                //console.log(refreshToken.toString());
                /* console.log(getDetails(req));

                setRefreshToken(res, refreshToken.toString());
                setRefreshToken(res, '123'); */
                app.setUser(request, reply, user);

                return user;
            }

            throw new AuthWrongCredentialsError();
        },

        createUser ( parent, {id, email, password}, {db} ) {
            const newUser = {id, email, password};

            users.push(newUser);

            return newUser;
        }
        /* ,
        updateUser: (parent, { id, name, email, age }, context) => {
            let newUser = users.find(user => user.id === id);

            newUser.name = name;
            newUser.email = email;
            newUser.age = age;

            return newUser;
        },
        deleteUser: (parent, { id }, context) => {
            const userIndex = users.findIndex(user => user.id === id);

            if (userIndex === -1) throw new Error("User not found.");

            const deletedUsers = users.splice(userIndex, 1);

            return deletedUsers[0];
        } */
    }
};
