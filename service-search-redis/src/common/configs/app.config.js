const DEV = {
    app: {
        port: process.env.PORT || 5000,
        morgan: process.env.MORGAN || 'dev',
        node: process.env.NODE_ENV,
        web_server: process.env.WEB_SERVER,
    },
};
const PRO = {
    app: {
        port: process.env.PORT || 5000,
        morgan: process.env.MORGAN || 'combined',
        node: process.env.NODE_ENV,
        web_server: process.env.WEB_SERVER,
    },
};
const config = { DEV, PRO };

const env = process.env.NODE_ENV || 'DEV';

module.exports = config[env];
