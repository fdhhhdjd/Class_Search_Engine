//* LIB
const { Schema, Repository } = require('redis-om');
const { v4: uuidv4 } = require('uuid');

//* IMPORT
const { Car, NameIndex } = require('../../../../common/cache/cart');
const redisClient = require('../../../../dbs/client');

const myIDGeneratorFunc = () => uuidv4();

const carSchema = new Schema(
    'cart',
    {
        id: { type: 'string', auto: true },
        make: { type: 'string', sortable: true },
        model: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'text', textSearch: true, normalized: true },
    },
    {
        dataStructure: 'HASH',
        prefix: 'cart',
        idStrategy: myIDGeneratorFunc,
        indexHashName: Car,
        indexName: NameIndex,
        stopWords: ['a', 'an', 'the'],
    },
);

const carRepository = new Repository(carSchema, redisClient);

module.exports = carRepository;
