import Sequelize from 'sequelize';
import fastifyPlugin from 'fastify-plugin';

import config from '../config.js';


const forceSync = true;


export default fastifyPlugin(async app => {
    const sequelize = new Sequelize(config.db);
    const modelNames = [
        'aesKey',
        'code',
        'ecKey',
        'note',
        'noteRevision',
        'noteTag',
        'refreshToken',
        'tag',
        'user'
    ];

    await Promise.all(modelNames.map(async name => {
        const model = await import(`../models/${name}.js`);
        model.default(sequelize);
    }));

        await sequelize.authenticate();
        app.log.info('sequelize: connection has been established successfully');

    const {models} = sequelize;

    models.aesKey.hasMany(models.code);
    models.user.hasMany(models.code);
    models.user.hasMany(models.aesKey);
    models.user.hasMany(models.ecKey);
    models.user.hasMany(models.note);
    models.user.hasMany(models.refreshToken);
    models.user.hasMany(models.tag);

    models.code.hasOne(models.note, {constraints: false});
    models.code.hasOne(models.tag, {constraints: false});
    models.code.hasOne(models.ecKey, {constraints: false});
    models.code.hasOne(models.noteRevision, {constraints: false});

    models.note.hasMany(models.noteRevision);
    models.note.belongsToMany(models.tag, {through: models.noteTag});
    models.tag.belongsToMany(models.note, {through: models.noteTag});

    await sequelize.sync({force: forceSync});

    app.decorate('db', sequelize);


    const u1 = await models.user.create({email: 'test@test.com', password: 'test'});
    const k1 = await u1.createAesKey({
        typeId: 1,
        iterations: 2304427,
        salt: 'SKBgR4j28GQdJ5vojaA9MQ'
    });
    const c1 = await k1.createCode({
        userId: u1.id,
        iv: 'iyh7zPoLqM3wA0Cm',
        em: '8I54aQvyNJ2zkFTdVauHeq/lAIkLxwqzv9IcnpQeadiEbpxmHHKwNAZzCF/s/yqT'
    });
    const k2 = await u1.createAesKey({typeId: 2, codeId: c1.id});
    u1.update({unlockAesKeyId: k1.id, mainAesKeyId: k2.id});
    console.log('user', u1.toJSON());
    console.log('unlock key', k1.toJSON());
    console.log('main key code', c1.toJSON());
    console.log('main key', k2.toJSON());
    //await k1.destroy();

    const c2 = await u1.createCode({
        aesKeyId: k2.id,
        iv: '2222222222222222',
        em: '2222222222222222222222222222222222222222222222222222222222222222'
    });
    const n1 = await u1.createNote({codeId: c2.id});
    const n2 = await u1.createNote({codeId: c2.id});
    //await n1.destroy();
    /*await models.note.destroy({
        where: {id: [n1.id, n2.id]}
    }); /**/

    const c3 = await u1.createCode({
        aesKeyId: k2.id,
        iv: '3333333333333333',
        em: '3333333333333333333333333333333333333333333333333333333333333333'
    });
    const t1 = await u1.createTag({codeId: c3.id});

    const r1 = await u1.createRefreshToken({
        data: 'random string',
        expireAt: new Date()
    });

    /* const [dump] = await sequelize.query('SELECT * FROM sqlite_master ORDER BY type, name', {raw: true});
    dump.forEach(({sql}) => {
        if ( sql ) {
            console.log(sql);
        }
    }); */


    // const u2 = await models.user.create({email: 'test2@test.com', password: 'test2'});
    // const c2 = await models.code.create({iv: 'd2', em: 'd2'});
    // const c3 = await models.code.create({iv: 'c3', em: 'c3'});
    // const c4 = await models.code.create({iv: 'c4', em: 'c4'});
    // const t1 = await models.tag.create({userId: 1, codeId: 1});
    // const t2 = await u1.createTag({codeId: 2});
    // const t3 = await u1.createTag({codeId: 3});
    // const n1 = await u1.createNote({codeId: 1});
    // const n2 = await u1.createNote({codeId: 2});
    // const n3 = await u1.createNote({codeId: 3});
    // const n4 = await u2.createNote({codeId: 4});
    // await n1.addTags([t1, t2]);
    // await n2.addTags([t3, t1]);
    //await n1.removeTags([t2]);

    //console.log(await models.aesKey.findAll());
    //console.log(await models.aesKey.scope('full').findAll());

    /* const n1 = await models.note.create({userId: 1, data: 'note1'});
    const t1 = await models.tag.create({userId: 1, data: 'tag1'});
    const t2 = await models.tag.create({userId: 1, data: 'tag2'});
    //console.log((await n1.getUser()).toJSON());
    await n1.addTags([t1, t2]); */
});
