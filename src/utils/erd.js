import fastify from 'fastify';
import {writeFile} from 'fs/promises';
import sequelizeErd from 'sequelize-erd';

const svgFileName = './erd.svg';
const app = fastify();


await app.register(import('../plugins/sequelize.js'));

await writeFile(
    svgFileName,
    await sequelizeErd({source: app.db, arrowSize: 1.5})
);
console.log(`${svgFileName} is saved`);
