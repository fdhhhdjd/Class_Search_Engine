//* LIB
const { Client } = require('redis-om');

class RedisConnection {
    constructor() {
        this.client = null;
    }

    async createConnection(url) {
        if (!this.client || !this.client.isOpen()) {
            this.client = new Client();
            await this.client.open(url);
            console.info('Connected to Redis successfully.');
        }
    }

    getClient() {
        if (!this.client) {
            throw new Error('Redis client not initialized. Call createConnection first.');
        }
        return this.client;
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new RedisConnection();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

// Export Singleton instance của RedisConnection
const redisConnection = new Singleton().getInstance();
module.exports = redisConnection;
