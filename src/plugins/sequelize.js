import Sequelize from 'sequelize';
import fastifyPlugin from 'fastify-plugin';

import {writeFile} from 'fs';
import sequelizeErd from 'sequelize-erd';

const forceSync = true;

const sequelize = new Sequelize(/* 'sqlite::memory:', */ {
    dialect: 'sqlite',
    storage: './database.sqlite',
    /* host: config.host,
    port: config.port,
    dialect: 'postgres', */
    logging: ['debug', 'trace'].includes(process.env.FORTNOTES_LOG_LEVEL)
        ? queryString => console.log(queryString)
        : false
});

const generateErd = ( db, app ) => {
    sequelizeErd({source: db, arrowSize: 1.5}).then(svg => writeFile(
        './erd.svg',
        svg,
        () => app.log.info('sequelize: erd.svg is saved')
    ));
};

//console.log(await import('./models/note.js'));
//const Note = import('./models/note.js')(sequelize);
//import('./models/note.js').then(({default: model}) => model(sequelize));
//Note(sequelize);
//console.log(Note(sequelize));

export default fastifyPlugin(async app => {
    (await import('../models/aesKey.js')).default(sequelize);
    (await import('../models/code.js')).default(sequelize);
    (await import('../models/ecKey.js')).default(sequelize);
    (await import('../models/note.js')).default(sequelize);
    (await import('../models/noteRevision.js')).default(sequelize);
    (await import('../models/noteTag.js')).default(sequelize);
    (await import('../models/refreshToken.js')).default(sequelize);
    (await import('../models/tag.js')).default(sequelize);
    (await import('../models/user.js')).default(sequelize);

    try {
        await sequelize.authenticate();
        app.log.info('sequelize: connection has been established successfully');
    } catch ( error ) {
        app.log.error(error, 'sequelize: unable to connect to the database!');
    }

    const {models} = sequelize;

    models.user.hasMany(models.note);
    models.user.hasMany(models.tag);
    models.user.hasMany(models.refreshToken);

    models.note.belongsTo(models.user);
    models.tag.belongsTo(models.user);
    models.note.belongsToMany(models.tag, {through: models.noteTag});
    models.tag.belongsToMany(models.note, {through: models.noteTag});
    models.refreshToken.belongsTo(models.user);

    models.user.belongsTo(models.aesKey);
    models.user.belongsTo(models.ecKey);
    models.aesKey.hasOne(models.user);
    models.ecKey.hasOne(models.user);

    //models.code.belongsTo(models.note, {constraints: false});
    //models.code.belongsTo(models.noteRevision, {constraints: false});
    //models.code.belongsTo(models.aesKey, {constraints: false});
    //models.code.belongsTo(models.tag, {constraints: false});
    //models.tag.hasOne(models.code/* , {constraints: false} */);
    //models.aesKey.hasOne(models.code, {constraints: false});
    //models.note.hasOne(models.code);
    //models.noteRevision.hasOne(models.code);

    models.code.hasOne(models.tag);
    models.code.hasOne(models.note);
    models.code.hasOne(models.noteRevision);
    models.code.hasOne(models.ecKey);
    models.code.hasOne(models.aesKey);

    models.tag.belongsTo(models.code);
    models.note.belongsTo(models.code);
    models.noteRevision.belongsTo(models.code);
    models.ecKey.belongsTo(models.code);
    models.aesKey.belongsTo(models.code);

    models.note.hasMany(models.noteRevision);
    models.noteRevision.belongsTo(models.note);

    generateErd(sequelize, app);

    await sequelize.sync({force: forceSync});

    app.decorate('db', sequelize);


    const c1 = await models.code.create({iv: 'iyh7zPoLqM3wA0Cm', em: '8I54aQvyNJ2zkFTdVauHeq/lAIkLxwqzv9IcnpQeadiEbpxmHHKwNAZzCF/s/yqT'});
    const k1 = await models.aesKey.create({iterations: 2304427, salt: 'SKBgR4j28GQdJ5vojaA9MQ', codeId: 1});
    const u1 = await models.user.create({email: 'test@test.com', password: 'test', aesKeyId: 1});
    const u2 = await models.user.create({email: 'test2@test.com', password: 'test2'});
    const c2 = await models.code.create({iv: 'd2', em: 'd2'});
    const c3 = await models.code.create({iv: 'c3', em: 'c3'});
    const c4 = await models.code.create({iv: 'c4', em: 'c4'});
    const t1 = await models.tag.create({userId: 1, codeId: 1});
    const t2 = await u1.createTag({codeId: 2});
    const t3 = await u1.createTag({codeId: 3});
    const n1 = await u1.createNote({codeId: 1});
    const n2 = await u1.createNote({codeId: 2});
    const n3 = await u1.createNote({codeId: 3});
    const n4 = await u2.createNote({codeId: 4});
    await n1.addTags([t1, t2]);
    await n2.addTags([t3, t1]);
    //await n1.removeTags([t2]);

    //console.log(await models.aesKey.findAll());
    //console.log(await models.aesKey.scope('full').findAll());

    /* const n1 = await models.note.create({userId: 1, data: 'note1'});
    const t1 = await models.tag.create({userId: 1, data: 'tag1'});
    const t2 = await models.tag.create({userId: 1, data: 'tag2'});
    //console.log((await n1.getUser()).toJSON());
    await n1.addTags([t1, t2]); */
});
