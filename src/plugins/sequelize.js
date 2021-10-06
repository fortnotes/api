/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import fastifyPlugin from 'fastify-plugin';
import {readdirSync} from 'fs';
import path from 'path';


const forceSync = true;
const modelsPath = path.join(process.cwd(), 'src', 'models');
const modelFileNames = readdirSync(modelsPath).map(fileName => path.join(modelsPath, fileName));

const setAssociations = models => {
    const {
        aesKey,
        code,
        ecKey,
        note,
        noteRevision,
        noteTag,
        refreshToken,
        tag,
        user
    } = models;

    aesKey.hasMany(code);
    aesKey.belongsTo(code, {foreignKey: 'codeId', as: 'code', constraints: false});
    code.belongsTo(aesKey);

    user.hasMany(code);
    code.belongsTo(user);

    user.hasMany(aesKey);
    aesKey.belongsTo(user);
    user.belongsTo(aesKey, {constraints: false});

    user.hasMany(ecKey);
    ecKey.belongsTo(user);

    user.hasMany(note);
    note.belongsTo(user);

    user.hasMany(refreshToken);
    refreshToken.belongsTo(user);

    user.hasMany(tag);
    tag.belongsTo(user);

    code.hasOne(note, {constraints: false});
    note.belongsTo(code, {constraints: false});

    code.hasOne(tag, {constraints: false});
    tag.belongsTo(code, {constraints: false});

    code.hasOne(ecKey, {constraints: false});
    ecKey.belongsTo(code, {constraints: false});

    code.hasOne(noteRevision, {constraints: false});
    noteRevision.belongsTo(code, {constraints: false});

    note.hasMany(noteRevision);
    noteRevision.belongsTo(note);

    note.belongsToMany(tag, {through: noteTag});
    tag.belongsToMany(note, {through: noteTag});
};


export default fastifyPlugin(async app => {
    const {config} = app;

    const db = new Sequelize(config.db);

    app.decorate('db', db);

    // load and init all db models
    await Promise.all(modelFileNames.map(async name => {
        (await import(name)).default(app);
    }));

    await db.authenticate();
    app.log.info('sequelize: connection has been established successfully');

    setAssociations(db.models);

    await db.sync({force: forceSync});

    return;

    /* eslint-disable no-unreachable */
    const u1 = await db.models.user.create({email: 'test@test.com', password: 'test'});
    const k1 = await u1.createAesKey({
        typeId: 1,
        iterations: 2304427,
        salt: 'SKBgR4j28GQdJ5vojaA9MQ'
    });
    await k1.getUser();
    await k1.getCode(); //<-- doesn't work, need more associations
    const c1 = await k1.createCode({
        userId: u1.id,
        iv: 'iyh7zPoLqM3wA0Cm',
        em: '8I54aQvyNJ2zkFTdVauHeq/lAIkLxwqzv9IcnpQeadiEbpxmHHKwNAZzCF/s/yqT'
    });
    await c1.getUser();
    await c1.getAesKey();
    const k2 = await u1.createAesKey({typeId: 2, codeId: c1.id});
    u1.update({unlockAesKeyId: k1.id, mainAesKeyId: k2.id});
    await u1.getUnlockAesKey(); //<-- doesn't work, need more associations
    await u1.getMainAesKey(); //<-- doesn't work, need more associations
    // console.log('user', u1.toJSON());
    // console.log('unlock key', k1.toJSON());
    // console.log('main key code', c1.toJSON());
    // console.log('main key', k2.toJSON());
    //await k1.destroy();

    const c2 = await u1.createCode({
        aesKeyId: k2.id,
        iv: '2222222222222222',
        em: '2222222222222222222222222222222222222222222222222222222222222222'
    });
    const n1 = await u1.createNote({codeId: c2.id});
    const n2 = await u1.createNote({codeId: c2.id});
    await n2.getUser();
    await n2.getCode();
    await c2.getNote();
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
    await t1.getCode();
    await t1.getUser();
    await c3.getTag();
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
