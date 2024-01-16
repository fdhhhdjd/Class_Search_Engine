//* IMPORT

const DEV = {
    cache: {
        redisMaster: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            protocol: process.env.REDIS_PROTOCOL,
        },
    },
};

const PRO = {
    cache: {
        redisMaster: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            user: process.env.REDIS_USER,
            password: process.env.REDIS_PASSWORD,
        },
    },
};

const configsRedis = {
    DEV,
    PRO,
};

const env = process.env.NODE_ENV || 'DEV';

module.exports = configsRedis[env];
