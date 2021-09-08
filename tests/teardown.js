import server from '../src/server.js';


export default async () => {
    await server.stop();
};
