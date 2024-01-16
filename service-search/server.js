//* IMPORT
const app = require('./src/app');
const {
    app: { port: PORT },
} = require('./src/common/configs/app.config');

const server = app.listen(PORT, () => {
    console.info(`Api backend start with http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => console.info('Exit Server Express'));
});
