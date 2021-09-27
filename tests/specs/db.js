import Server from '../../src/Server.js';
import config from '../../src/config.js';


describe('db', () => {
    let server;
    let models;

    beforeAll(async () => {
        server = new Server(config);
        await server.start();
        models = server.app.db.models;
    });

    afterAll(() => server.stop());

    it('create user - should pass', async () => {
        const user = await models.user.create({
            email: 'test@test.com',
            password: 'test'
        });
        //console.log('user', user.toJSON());

        const aesKey1 = await user.createAesKey({
            typeId: 1,
            iterations: 2304427,
            salt: 'SKBgR4j28GQdJ5vojaA9MQ'
        });
        await aesKey1.getUser();
        await aesKey1.getCode();
        //console.log('aesKey', aesKey.toJSON());

        const code = await aesKey1.createCode({
            userId: user.id,
            iv: 'iyh7zPoLqM3wA0Cm',
            em: '8I54aQvyNJ2zkFTdVauHeq/lAIkLxwqzv9IcnpQeadiEbpxmHHKwNAZzCF/s/yqT'
        });
        await code.getUser();
        await code.getAesKey();
        //console.log('code', code.toJSON());

        const aesKey2 = await user.createAesKey({typeId: 2, codeId: code.id});
        user.update({unlockAesKeyId: aesKey1.id, mainAesKeyId: aesKey2.id});
        await user.getUnlockAesKey();
        await user.getMainAesKey();
        //console.log('user', user.toJSON());

        expect(2 + 2).toStrictEqual(4);
    });
});
