import chai from 'chai';
import createRequest from '../utils/createRequest.js';

const {expect} = chai;

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

const requests = {
    anonymous: createRequest(),
    admin: createRequest(),
    user: createRequest()
};


describe('users', () => {
    describe('authorizaton', () => {
        it('login with empty credentials - should fail', async () => {
            const response = await requests.anonymous.call(getLoginMutation({email: '', password: ''}));

            expect(requests.anonymous.cookies).to.be.empty;
            expect(response.data.errors[0].extensions.code).to.equal('INTERNAL_SERVER_ERROR');
        });

        it('login with wrong credentials - should fail', async () => {
            const response = await requests.anonymous.call(getLoginMutation({email: 'wrong', password: 'wrong'}));

            expect(requests.anonymous.cookies).to.be.empty;
            expect(response.data.errors[0].extensions.code).to.equal('INTERNAL_SERVER_ERROR');
        });

        it('login admin with good credentials - should pass', async () => {
            const response = await requests.admin.call(getLoginMutation({email: 'test@test.com', password: 'test'}));

            expect(requests.admin.cookies).to.have.all.keys('accessToken', 'refreshToken');
            expect(requests.admin.cookies.accessToken.httpOnly).to.be.true;
            expect(requests.admin.cookies.refreshToken.httpOnly).to.be.true;
            expect(response.data).to.not.have.property('errors');
            expect(response.data.data.login).to.have.property('id');
        });

        // todo: setup correct user
        it.skip('login user with good credentials - should pass', async () => {
            const response = await requests.user.call(getLoginMutation({email: 'test2@test.com', password: 'test2'}));

            console.log(response.data);
            expect(response.data).to.not.have.property('errors');
            expect(response.data.data.login).to.have.property('id');
        });

        it('get admin notes - should pass', async () => {
            //setTimeout(async () => {
            const response = await requests.admin.call(getNotesQuery());

            expect(response.data).to.not.have.property('errors');
            expect(response.data.data.notes).to.be.an('array').to.have.lengthOf(4);
            //}, 1000);
        });

        // todo: add notes for this user
        it.skip('get user notes - should pass', async () => {
            const response = await requests.user.call(getNotesQuery());

            expect(response.data).to.not.have.property('errors');
            expect(response.data.data.notes).to.be.an('array').to.have.lengthOf(4);
        });
    });

    /*describe('jwt', () => {
        it('login admin with good credentials - should pass', async () => {
            const response = await requests.admin.call(getLoginMutation({email: 'test@test.com', password: 'test'}));

            //console.log(response.headers);
            //console.log(response.data.data.login);
            expect(response.data).to.not.have.property('errors');
            expect(response.data.data.login).to.have.property('id');
        });
    });/**/
});
