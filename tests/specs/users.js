import Server from '../../src/Server.js';
import config from '../../src/config.js';

import createRequest from '../utils/createRequest.js';


const getLoginMutation = variables => ({
    data: {
        query: `
            mutation login ( $email: String!, $password: String! ) {
                login ( email: $email, password: $password ) {
                    id
                    aesKey {
                        salt
                        iterations
                        code {
                            iv
                            em
                        }
                    }
                }
            }`,
        variables
    }
});

const getNotesQuery = () => ({
    data: {
        query: `{
            notes {
                id
                code {
                    iv
                    em
                }
                createdAt
            }
        }`
    }
});


describe('users', () => {
    let server;
    //let models;
    let requests;

    beforeAll(async () => {
        server = new Server(config);
        await server.start();
        //models = server.app.db.models;
        requests = {
            anonymous: createRequest(config)(),
            admin: createRequest(config)(),
            user: createRequest(config)()
        };
    });

    afterAll(() => server.stop());

    describe('authorization', () => {
        it.skip('login with empty credentials - should fail', async () => {
            const response = await requests.anonymous.call(getLoginMutation({email: '', password: ''}));

            expect(requests.anonymous.cookies).toStrictEqual({});
            expect(response.data.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
        });

        it.skip('login with wrong credentials - should fail', async () => {
            const response = await requests.anonymous.call(getLoginMutation({email: 'wrong', password: 'wrong'}));

            expect(requests.anonymous.cookies).toStrictEqual({});
            expect(response.data.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
        });

        it.skip('login admin with good credentials - should pass', async () => {
            const response = await requests.admin.call(getLoginMutation({email: 'test@test.com', password: 'test'}));

            expect(requests.admin.cookies).toHaveProperty('accessToken');
            expect(requests.admin.cookies).toHaveProperty('refreshToken');
            expect(requests.admin.cookies.accessToken.httpOnly).toBe(true);
            expect(requests.admin.cookies.refreshToken.httpOnly).toBe(true);
            expect(response.data).not.toHaveProperty('errors');
            expect(response.data.data.login).toHaveProperty('id');
        });

        // todo: setup correct user
        it.skip('login user with good credentials - should pass', async () => {
            const response = await requests.user.call(getLoginMutation({email: 'test2@test.com', password: 'test2'}));

            //console.log(response.data);
            expect(response.data).not.toHaveProperty('errors');
            expect(response.data.data.login).toHaveProperty('id');
        });

        it.skip('get admin notes - should pass', async () => {
            //setTimeout(async () => {
            const response = await requests.admin.call(getNotesQuery());

            expect(response.data).not.toHaveProperty('errors');
            expect(response.data.data.notes).toBeInstanceOf(Array);
            expect(response.data.data.notes).toHaveLength(4);
            //}, 1000);
        });

        // todo: add notes for this user
        it.skip('get user notes - should pass', async () => {
            const response = await requests.user.call(getNotesQuery());

            expect(response.data).not.toHaveProperty('errors');
            expect(response.data.data.notes).toBeInstanceOf(Array);
            expect(response.data.data.notes).toHaveLength(4);
        });
    });

    /*describe('jwt', () => {
        it('login admin with good credentials - should pass', async () => {
            const response = await requests.admin.call(getLoginMutation({email: 'test@test.com', password: 'test'}));

            //console.log(response.headers);
            //console.log(response.data.data.login);
            expect(response.data).not.toHaveProperty('errors');
            expect(response.data.data.login).toHaveProperty('id');
        });
    });/**/
});
